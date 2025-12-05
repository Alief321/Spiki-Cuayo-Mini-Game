'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Vec2 } from '@/types/Vec2';
import { getRandomCrySound, getRandomWalkSound } from '@/lib/randomSound';

type FallingItem = {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'good' | 'bad'; // good = +10 points, bad = -5 points
};
import { FaInfoCircle } from 'react-icons/fa';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { BiSolidVolumeMute } from 'react-icons/bi';

export default function SpikiChibi() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [pos, setPos] = useState<Vec2>({ x: 150, y: 100 });
  const [vel, setVel] = useState<Vec2>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [grounded, setGrounded] = useState(false);
  const lastMouse = useRef<Vec2>({ x: 0, y: 0 });
  const jumpPressed = useRef(false);
  const [jumped, setJumped] = useState(false);
  const lastThrowTime = useRef(0);
  const dragOffset = useRef<Vec2>({ x: 0, y: 0 });

  // Audio refs
  const jumpAudio = useRef<HTMLAudioElement | null>(null);
  const cryAudio = useRef<HTMLAudioElement | null>(null);
  const walkAudio = useRef<HTMLAudioElement | null>(null);
  const [isWalkPlaying, setIsWalkPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [score, setScore] = useState(0);
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const bgMusicAudio = useRef<HTMLAudioElement | null>(null);
  const nextItemIdRef = useRef(0);
  const fallingItemIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isCollision, setIsCollision] = useState(false);

  const SPRITE_W = 120;
  const SPRITE_H = 140;
  // Tune physics so keyboard input can beat gravity on Y
  const SPEED = 1.2;
  const GRAV = 0.6;
  const GROUND_FRICTION = 0.88;
  const AIR_RESISTANCE = 0.98;
  const JUMP = -13;
  const FAST_DROP = 4;

  // Initialize audio
  useEffect(() => {
    jumpAudio.current = new Audio('/sound/jump.mp3');
    jumpAudio.current.loop = true;

    // Cry and walk sounds will be randomly selected on each play
    // (not initialized here)

    // Background music - start immediately
    bgMusicAudio.current = new Audio('/sound/background-music.mp3');
    bgMusicAudio.current.loop = true;
    bgMusicAudio.current.volume = 0.3; // Low volume
  }, []);

  // Detect system dark mode preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    // Load score from local storage
    const savedScore = localStorage.getItem('speakiScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  // Toggle background music
  useEffect(() => {
    if (bgMusicAudio.current) {
      if (isMusicPlaying && bgMusicAudio.current.paused) {
        bgMusicAudio.current.play().catch(() => {});
      } else if (!isMusicPlaying && !bgMusicAudio.current.paused) {
        bgMusicAudio.current.pause();
      }
    }
  }, [isMusicPlaying]);

  // Input Keyboard
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (dragging) return;

      const isLeft = e.key === 'a' || e.key === 'ArrowLeft';
      const isRight = e.key === 'd' || e.key === 'ArrowRight';
      const isJump = e.code === 'Space' || e.key === ' ';
      const isDown = e.key === 'ArrowDown';

      if (isJump) {
        // Jump only once per press and only when grounded
        if (!jumpPressed.current && grounded) {
          setVel((v) => ({ ...v, y: JUMP }));
          jumpPressed.current = true;
          setJumped(true);
          // Start jump sound loop
          if (jumpAudio.current && jumpAudio.current.paused) {
            jumpAudio.current.currentTime = 0;
            jumpAudio.current.play().catch(() => {});
          }
        }
        return;
      }

      if (isDown) {
        // Quick drop
        setVel((v) => ({ ...v, y: v.y + FAST_DROP }));
        return;
      }

      if (isLeft || isRight) {
        setVel((v) => ({ ...v, x: v.x + (isLeft ? -SPEED : SPEED) }));
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === 'Space' || e.key === ' ') {
        jumpPressed.current = false;
        setJumped(false);
      }
    }

    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [dragging, grounded]);

  // Manage walk sound based on movement - play once per movement press, let finish naturally
  useEffect(() => {
    const isMoving = grounded && Math.abs(vel.x) > 0.5 && !dragging;

    if (isMoving && !isWalkPlaying) {
      // Create new random walk audio each time
      walkAudio.current = new Audio(getRandomWalkSound());
      walkAudio.current.currentTime = 0;
      walkAudio.current.play().catch(() => {});
      setIsWalkPlaying(true);

      // Mark as finished when sound ends
      walkAudio.current.onended = () => {
        setIsWalkPlaying(false);
      };
    }
    // Never pause mid-play even if vel changes or movement stops
  }, [vel.x, grounded, dragging, isWalkPlaying]);

  // Manage jump sound - stop when grounded
  useEffect(() => {
    if (grounded && jumpAudio.current && !jumpAudio.current.paused) {
      jumpAudio.current.pause();
      jumpAudio.current.currentTime = 0;
    }
  }, [grounded]);

  // Spawn falling items every 10 seconds
  useEffect(() => {
    fallingItemIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const randomX = Math.random() * (rect.width - 60);
        const itemType = Math.random() > 0.4 ? 'good' : 'bad'; // 60% good, 40% bad
        const newItem: FallingItem = {
          id: nextItemIdRef.current++,
          x: randomX,
          y: -60,
          size: 60,
          type: itemType,
        };
        setFallingItems((prev) => [...prev, newItem]);
      }
    }, 10000);

    return () => {
      if (fallingItemIntervalRef.current) {
        clearInterval(fallingItemIntervalRef.current);
      }
    };
  }, []);

  // Animate falling items and check collisions
  useEffect(() => {
    let animationFrameId: number;

    const fallTick = () => {
      setFallingItems((prevItems) => {
        const containerHeight = containerRef.current?.getBoundingClientRect().height || 800;

        return prevItems
          .map((item) => ({
            ...item,
            y: item.y + 2.5, // Smooth falling speed
          }))
          .filter((item) => {
            // Check collision with main sprite (use closure to access current pos)
            const distX = Math.abs(item.x + item.size / 2 - (pos.x + SPRITE_W / 2));
            const distY = Math.abs(item.y + item.size / 2 - (pos.y + SPRITE_H / 2));
            const collision = distX < SPRITE_W / 2 + item.size / 2 && distY < SPRITE_H / 2 + item.size / 2;

            if (collision) {
              setIsCollision(true);

              if (item.type === 'good') {
                // Good item: increase score
                setScore((prev) => {
                  const newScore = Math.max(0, prev + 10);
                  localStorage.setItem('speakiScore', newScore.toString());
                  return newScore;
                });
              } else {
                // Bad item: decrease score and play jump sound
                setScore((prev) => {
                  const newScore = Math.max(0, prev - 5);
                  localStorage.setItem('speakiScore', newScore.toString());
                  return newScore;
                });
                // Play jump audio as warning sound
                if (jumpAudio.current) {
                  jumpAudio.current.pause();
                  jumpAudio.current.currentTime = 0;
                  jumpAudio.current.play().catch(() => {});
                }
              }

              setTimeout(() => setIsCollision(false), 500);
              return false; // Remove item
            }

            // Remove if out of bounds
            return item.y < containerHeight;
          });
      });

      animationFrameId = requestAnimationFrame(fallTick);
    };

    animationFrameId = requestAnimationFrame(fallTick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [pos.x, pos.y, SPRITE_W, SPRITE_H]);

  // Physics Engine
  useEffect(() => {
    const tick = () => {
      setVel((prevVel) => {
        // Use different friction for X based on grounded state
        const xFriction = grounded ? GROUND_FRICTION : AIR_RESISTANCE;
        const nextVel: Vec2 = {
          x: prevVel.x * xFriction,
          y: prevVel.y + GRAV,
        };

        if (Math.abs(nextVel.x) > 0.05) {
          setFacingRight(nextVel.x > 0);
        }

        setPos((prevPos) => {
          const container = containerRef.current;
          if (!container) {
            return { x: prevPos.x + nextVel.x, y: prevPos.y + nextVel.y };
          }

          const r = container.getBoundingClientRect();
          let nx = prevPos.x + nextVel.x;
          let ny = prevPos.y + nextVel.y;

          if (nx < 0 || nx > r.width - SPRITE_W) {
            nextVel.x = -nextVel.x * 0.7;
            nx = Math.max(0, Math.min(nx, r.width - SPRITE_W));
          }

          if (ny < 0 || ny > r.height - SPRITE_H) {
            const now = performance.now();
            const recentlyThrown = now - lastThrowTime.current < 500;

            // Only bounce if recently thrown, otherwise just stop
            if (recentlyThrown) {
              nextVel.y = -nextVel.y * 0.7;
            } else {
              nextVel.y = 0;
            }

            ny = Math.max(0, Math.min(ny, r.height - SPRITE_H));
            // Set grounded if at bottom
            if (ny >= r.height - SPRITE_H) {
              setGrounded(true);
            }
          } else {
            setGrounded(false);
          }

          return { x: nx, y: ny };
        });

        return nextVel;
      });

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [grounded]);

  // Mouse Drag
  function handleDown(e: React.MouseEvent) {
    setDragging(true);
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      // Store offset from cursor to sprite top-left
      dragOffset.current = {
        x: e.clientX - rect.left - pos.x,
        y: e.clientY - rect.top - pos.y,
      };
    }
    lastMouse.current = { x: e.clientX, y: e.clientY };
    // Create new random cry sound and start loop
    cryAudio.current = new Audio(getRandomCrySound());
    cryAudio.current.loop = true;
    cryAudio.current.currentTime = 0;
    cryAudio.current.play().catch(() => {});
  }

  function handleMove(e: React.MouseEvent) {
    if (!dragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    // Position sprite at cursor with offset
    const newX = e.clientX - rect.left - dragOffset.current.x;
    const newY = e.clientY - rect.top - dragOffset.current.y;

    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPos({ x: newX, y: newY });
    setVel({ x: dx * 0.7, y: dy * 0.7 });
  }

  function handleUp() {
    if (dragging) {
      lastThrowTime.current = performance.now();
      // Stop cry sound
      if (cryAudio.current && !cryAudio.current.paused) {
        cryAudio.current.pause();
        cryAudio.current.currentTime = 0;
      }
    }
    setDragging(false);
  }

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: `url('/assets/${isDarkMode ? 'background-dark.png' : 'background.png'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
      className={`w-full h-screen overflow-hidden relative select-none transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
    >
      {/* Falling Items */}
      {fallingItems.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none transition-transform"
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
          }}
        >
          <img src={`/assets/${item.type === 'good' ? 'Speaki-Cherrful.png' : 'Speaki-Cry.png'}`} className="w-full h-full object-contain drop-shadow-lg animate-bounce" draggable={false} />
        </div>
      ))}

      {/* Scoreboard - Chibi Style */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div
          className={`bg-gradient-to-br   rounded-3xl px-12 py-8 shadow-2xl border-4 border-pink-400 ${
            isDarkMode ? 'from-indigo-600 via-purple-700 to-blue-800 backdrop-blur-sm ' : 'from-pink-300 via-purple-300 to-blue-300 backdrop-blur-sm '
          }`}
        >
          <div className="text-center">
            <p className="text-sm font-bold text-white drop-shadow-md mb-2">✨ SCORE ✨</p>
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 to-white drop-shadow-lg">{score}</p>
          </div>
        </div>
      </motion.div>

      {/* Music Toggle Button */}
      <motion.button
        onClick={() => setIsMusicPlaying(!isMusicPlaying)}
        animate={{ rotate: isMusicPlaying ? 360 : 0 }}
        transition={{ duration: 3, repeat: isMusicPlaying ? Infinity : 0, ease: 'linear' }}
        className={`absolute top-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl drop-shadow-md ${
          isDarkMode ? ' from-indigo-400 to-purple-500' : ' from-yellow-300 to-orange-300'
        }`}
        title={isMusicPlaying ? 'Matikan musik' : 'Hidupkan musik'}
      >
        {isMusicPlaying ? <IoMusicalNotesSharp /> : <BiSolidVolumeMute />}
      </motion.button>

      {/* Dark Mode Toggle Button */}
      <motion.button
        onClick={() => setIsDarkMode(!isDarkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute bg-gradient-to-br top-4 left-20 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl drop-shadow-md ${
          isDarkMode ? ' from-indigo-400 to-purple-500' : ' from-yellow-300 to-orange-300'
        }`}
        title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
      >
        {isDarkMode ? '🌙' : '☀️'}
      </motion.button>

      {/* Info Button */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className={`absolute bg-gradient-to-br top-4 right-4 w-12 h-12 rounded-full  cursor-pointer hover:brightness-90shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl font-bold text-white drop-shadow-md ${
          isDarkMode ? ' from-indigo-400 to-purple-500' : ' from-yellow-300 to-orange-300'
        }`}
        title="Info"
      >
        <FaInfoCircle />
      </button>

      {showInfo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          onClick={() => setShowInfo(false)}
        >
          <div className="absolute inset-0" />
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={`relative bg-gradient-to-br rounded-3xl p-8 shadow-2xl max-w-sm mx-4 border-4 ${
              isDarkMode ? 'from-indigo-100 via-purple-100 to-pink-100 border-purple-300' : 'from-yellow-100 via-orange-100 to-pink-100 border-yellow-300'
            }`}
          >
            <button onClick={() => setShowInfo(false)} className="absolute top-4 right-4 w-8 h-8 bg-red-400 rounded-full text-white font-bold text-lg hover:bg-red-500 transition-colors">
              ✕
            </button>

            <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r  mb-4 ${isDarkMode ? 'from-indigo-400 to-purple-500' : 'from-yellow-500 to-orange-400'}`}>Cara Bermain Speaki 🎮</h2>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-lg">⌨️</span>
                <div>
                  <p className="font-bold text-pink-600">Gerak Kiri/Kanan</p>
                  <p>
                    Tekan <strong>A / ← Arrow</strong> untuk bergerak ke kiri
                  </p>
                  <p>
                    Tekan <strong>D / → Arrow</strong> untuk bergerak ke kanan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg">⬆️</span>
                <div>
                  <p className="font-bold text-pink-600">Lompat</p>
                  <p>
                    Tekan <strong>Spasi</strong> untuk lompat (hanya 1x per tekan)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg">⬇️</span>
                <div>
                  <p className="font-bold text-pink-600">Turun Cepat</p>
                  <p>
                    Tekan <strong>↓ Arrow</strong> untuk jatuh lebih cepat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg">🖱️</span>
                <div>
                  <p className="font-bold text-pink-600">Drag & Lempar</p>
                  <p>Klik & tahan Speaki, gerakkan mouse, lepas untuk melempar</p>
                </div>
              </div>
            </div>

            <div className={`mt-6 p-3  rounded-2xl border-2 ${isDarkMode ? 'border-purple-300' : 'border-yellow-300'}`}>
              <p className="text-xs text-gray-600 text-center italic">✨ Selamat bermain dengan Speaki Cuayooo! ✨</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        onMouseDown={handleDown}
        animate={{ x: pos.x, y: pos.y, scaleX: facingRight ? -1 : 1 }}
        transition={dragging ? { type: 'tween', duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }}
        className="absolute w-[120px] h-[140px] cursor-grab active:cursor-grabbing origin-center"
      >
        <img src={`/assets/${dragging ? 'Speaki-Cry.png' : jumped || isCollision ? 'Speaki-Happu.png' : 'Speaki-Cherrful.png'}`} className="w-full h-full object-contain" draggable={false} />
      </motion.div>
    </div>
  );
}
