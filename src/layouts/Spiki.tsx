'use client';
import { useState, useEffect } from 'react';
import { Scoreboard } from '@/components/game/Scoreboard';
import { MusicButton } from '@/components/game/MusicButton';
import { DarkModeButton } from '@/components/game/DarkModeButton';
import { InfoButton } from '@/components/game/InfoButton';
import { InfoModal } from '@/components/game/InfoModal';
import { FallingItems } from '@/components/game/FallingItems';
import { SpeakiCharacter } from '@/components/game/SpeakiCharacter';
import { usePhysics } from '@/hooks/usePhysics';
import { useAudio } from '@/hooks/useAudio';
import { useKeyboard } from '@/hooks/useKeyboard';
import { useDrag } from '@/hooks/useDrag';
import { useFallingItems } from '@/hooks/useFallingItems';
import { useJumpAudio, useBackgroundMusic, playCollisionSound } from '@/hooks/useSoundEffects';
import { ResetScore } from '@/components/game/ResetScoreToggle';

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
        playCollisionSound(jumpAudio);
      } else {
        setScore((prev) => {
          const newScore = Math.max(0, prev - 5);
          localStorage.setItem('speakiScore', newScore.toString());
          return newScore;
        });
        playCollisionSound(cryAudio2);
      }
      setTimeout(() => setIsCollision(null), 500);
    },
    SPRITE_W,
    SPRITE_H,
  });

  // reset score function
  function resetScore() {
    if (window.confirm('Apakah kamu yakin ingin mereset skor? Tindakan ini tidak bisa dibatalkan.')) {
      setScore(0);
      localStorage.setItem('speakiScore', '0');
    }
  }

  // Sound Effects
  useKeyboard({
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
      }}
      className={`w-full h-screen overflow-hidden relative select-none transition-all duration-500 ${isDarkMode ? 'dark' : ''}`}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
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
      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} isDarkMode={isDarkMode} onResetScore={() => resetScore()} />

      {/* Reset Score Button */}
      {<ResetScore isDarkMode={isDarkMode} onToggle={() => resetScore()} />}

      {/* Speaki Character */}
      <SpeakiCharacter pos={pos} vel={vel} facingRight={facingRight} dragging={dragging} jumped={jumped} isCollision={isCollision} onMouseDown={dragDown} />
    </div>
  );
}
