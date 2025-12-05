'use client';
import { useState, useEffect } from 'react';
import { Scoreboard } from '@/components/game/Scoreboard';
import { MusicButton } from '@/components/game/MusicButton';
import { DarkModeButton } from '@/components/game/DarkModeButton';
import { InfoButton } from '@/components/game/InfoButton';
import { InfoModal } from '@/components/game/InfoModal';
import { FallingItems } from '@/components/game/FallingItems';
import { SpeakiCharacter } from '@/components/game/SpeakiCharacter';
import { MobileControls } from '@/components/game/MobileControls';
import { usePhysics } from '@/hooks/usePhysics';
import { useAudio } from '@/hooks/useAudio';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useDrag } from '@/hooks/useDrag';
import { useFallingItems } from '@/hooks/useFallingItems';
import { useJumpAudio, useBackgroundMusic, playCollisionSound } from '@/hooks/useSoundEffects';

export default function SpikiChibi() {
  // State Management
  const [showInfo, setShowInfo] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [score, setScore] = useState(0);
  const [isWalkPlaying, setIsWalkPlaying] = useState(false);
  const [isCollision, setIsCollision] = useState<'bad' | 'good' | null>(null);

  // Hooks
  const { pos, vel, setVel, setPos, facingRight, grounded, jumped, setJumped, containerRef, jumpPressed, lastThrowTime, SPEED, JUMP, FAST_DROP, SPRITE_W, SPRITE_H } = usePhysics();
  const { jumpAudio, cryAudio, cryAudio2, walkAudio, bgMusicAudio } = useAudio();
  const {
    dragging,
    handleDown: dragDown,
    handleMove,
    handleUp,
  } = useDrag({
    pos,
    setPos,
    setVel,
    cryAudio,
    lastThrowTime,
    SPRITE_W,
    SPRITE_H,
    containerRef,
  });
  const { fallingItems } = useFallingItems({
    pos,
    containerRef,
    onCollision: (type) => {
      setIsCollision(type);
      if (type === 'good') {
        setScore((prev) => {
          const newScore = Math.max(0, prev + 10);
          localStorage.setItem('speakiScore', newScore.toString());
          return newScore;
        });
        playCollisionSound(jumpAudio, false);
      } else {
        setScore((prev) => {
          const newScore = Math.max(0, prev - 5);
          localStorage.setItem('speakiScore', newScore.toString());
          return newScore;
        });
        playCollisionSound(cryAudio2, false);
      }
      setTimeout(() => setIsCollision(null), 500);
    },
    SPRITE_W,
    SPRITE_H,
  });

  // Detect Mobile
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Sound Effects & Keyboard
  const { handleMoveLeft, handleMoveRight, handleJump, handleJumpRelease } = useKeyboard({
    dragging,
    grounded,
    vel,
    setVel,
    jumpPressed,
    setJumped,
    jumpAudio,
    walkAudio,
    isWalkPlaying,
    setIsWalkPlaying,
    SPEED,
    JUMP,
    FAST_DROP,
  });
  useJumpAudio(grounded, jumpAudio);
  useBackgroundMusic(isMusicPlaying, bgMusicAudio);

  // Initialize
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);

    const savedScore = localStorage.getItem('speakiScore');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundImage: `url('/assets/${isDarkMode ? 'background-dark.png' : 'background.png'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        maxHeight: '100vh',
      }}
      className={`w-full overflow-hidden relative select-none transition-all duration-500 fixed inset-0 ${isDarkMode ? 'dark' : ''}`}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onTouchMove={(e) => handleMove(e as any)}
      onTouchEnd={handleUp}
    >
      {/* Falling Items */}
      <FallingItems items={fallingItems} />

      {/* Scoreboard */}
      <Scoreboard score={score} isDarkMode={isDarkMode} />

      {/* Music Toggle Button */}
      <MusicButton isMusicPlaying={isMusicPlaying} onToggle={() => setIsMusicPlaying(!isMusicPlaying)} isDarkMode={isDarkMode} />

      {/* Dark Mode Toggle Button */}
      <DarkModeButton isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />

      {/* Info Button */}
      <InfoButton isDarkMode={isDarkMode} onClick={() => setShowInfo(!showInfo)} />

      {/* Info Modal */}
      <InfoModal
        isOpen={showInfo}
        onClose={() => setShowInfo(false)}
        isDarkMode={isDarkMode}
        onResetScore={() => {
          setScore(0);
          localStorage.removeItem('speakiScore');
        }}
      />

      {/* check device is mobile? */}

      {/* Mobile Controls */}
      {isMobile && <MobileControls onMoveLeft={handleMoveLeft} onMoveRight={handleMoveRight} onJump={handleJump} onJumpRelease={handleJumpRelease} isDarkMode={isDarkMode} />}

      {/* Speaki Character */}
      <SpeakiCharacter pos={pos} vel={vel} facingRight={facingRight} dragging={dragging} jumped={jumped} isCollision={isCollision} onMouseDown={dragDown} />
    </div>
  );
}
