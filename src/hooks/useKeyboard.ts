import { useEffect, useCallback, useRef } from 'react';
import type { Vec2 } from '@/types/Vec2';
import { getRandomWalkSound } from '@/lib/randomSound';

interface UseKeyboardProps {
  dragging: boolean;
  grounded: boolean;
  vel: Vec2;
  setVel: (updater: (v: Vec2) => Vec2) => void;
  jumpPressed: React.MutableRefObject<boolean>;
  setJumped: (jumped: boolean) => void;
  jumpAudio: React.MutableRefObject<HTMLAudioElement | null>;
  walkAudio: React.MutableRefObject<HTMLAudioElement | null>;
  isWalkPlaying: boolean;
  setIsWalkPlaying: (playing: boolean) => void;
  SPEED: number;
  JUMP: number;
  FAST_DROP: number;
}

export function useKeyboard({ dragging, grounded, vel, setVel, jumpPressed, setJumped, jumpAudio, walkAudio, isWalkPlaying, setIsWalkPlaying, SPEED, JUMP, FAST_DROP }: UseKeyboardProps) {
  const isMovingRef = useRef(false);

  // Mobile button handlers - trigger walk sound
  const handleMoveLeft = useCallback(() => {
    if (dragging) return;
    isMovingRef.current = true;
    setVel((v) => ({ ...v, x: v.x - SPEED }));
    // Trigger walk sound immediately on interaction (mobile-safe)
    if (grounded && !isWalkPlaying) {
      walkAudio.current = new Audio(getRandomWalkSound());
      walkAudio.current.currentTime = 0;
      walkAudio.current.play().catch(() => {});
      setIsWalkPlaying(true);
      walkAudio.current.onended = () => {
        setIsWalkPlaying(false);
      };
    }
  }, [dragging, SPEED, setVel, grounded, isWalkPlaying, setIsWalkPlaying, walkAudio]);

  const handleMoveRight = useCallback(() => {
    if (dragging) return;
    isMovingRef.current = true;
    setVel((v) => ({ ...v, x: v.x + SPEED }));
    // Trigger walk sound immediately on interaction (mobile-safe)
    if (grounded && !isWalkPlaying) {
      walkAudio.current = new Audio(getRandomWalkSound());
      walkAudio.current.currentTime = 0;
      walkAudio.current.play().catch(() => {});
      setIsWalkPlaying(true);
      walkAudio.current.onended = () => {
        setIsWalkPlaying(false);
      };
    }
  }, [dragging, SPEED, setVel, grounded, isWalkPlaying, setIsWalkPlaying, walkAudio]);

  const handleJump = useCallback(() => {
    if (dragging || !grounded || jumpPressed.current) return;
    setVel((v) => ({ ...v, y: JUMP }));
    jumpPressed.current = true;
    setJumped(true);
    if (jumpAudio.current && jumpAudio.current.paused) {
      jumpAudio.current.currentTime = 0;
      jumpAudio.current.play().catch(() => {});
    }
  }, [dragging, grounded, jumpPressed, JUMP, setVel, setJumped, jumpAudio]);

  const handleJumpRelease = useCallback(() => {
    jumpPressed.current = false;
    setJumped(false);
  }, [setJumped]);
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (dragging) return;

      const isLeft = e.key === 'a' || e.key === 'ArrowLeft';
      const isRight = e.key === 'd' || e.key === 'ArrowRight';
      const isJump = e.code === 'Space' || e.key === ' ';
      const isDown = e.key === 'ArrowDown';

      if (isJump) {
        if (!jumpPressed.current && grounded) {
          setVel((v) => ({ ...v, y: JUMP }));
          jumpPressed.current = true;
          setJumped(true);
          if (jumpAudio.current && jumpAudio.current.paused) {
            jumpAudio.current.currentTime = 0;
            jumpAudio.current.play().catch(() => {});
          }
        }
        return;
      }

      if (isDown) {
        setVel((v) => ({ ...v, y: v.y + FAST_DROP }));
        return;
      }

      if (isLeft || isRight) {
        isMovingRef.current = true;
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
  }, [dragging, grounded, SPEED, JUMP, FAST_DROP, setVel, jumpPressed, setJumped, jumpAudio]);

  // Walk sound management
  useEffect(() => {
    const isMoving = grounded && Math.abs(vel.x) > 0.5 && !dragging;

    if (isMoving && !isWalkPlaying) {
      walkAudio.current = new Audio(getRandomWalkSound());
      walkAudio.current.currentTime = 0;
      walkAudio.current.play().catch(() => {});
      setIsWalkPlaying(true);

      walkAudio.current.onended = () => {
        setIsWalkPlaying(false);
      };
    }
  }, [vel.x, grounded, dragging, isWalkPlaying, setIsWalkPlaying, walkAudio]);

  return {
    handleMoveLeft,
    handleMoveRight,
    handleJump,
    handleJumpRelease,
  };
}
