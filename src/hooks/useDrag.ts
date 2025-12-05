import { useRef, useState } from 'react';
import type { Vec2 } from '@/types/Vec2';
import { getRandomCrySound } from '@/lib/randomSound';

interface UseDragProps {
  pos: Vec2;
  setPos: (updater: (p: Vec2) => Vec2) => void;
  setVel: (updater: (v: Vec2) => Vec2) => void;
  cryAudio: React.MutableRefObject<HTMLAudioElement | null>;
  lastThrowTime: React.MutableRefObject<number>;
  SPRITE_W: number;
  SPRITE_H: number;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
}

export function useDrag({ pos, setPos, setVel, cryAudio, lastThrowTime, SPRITE_W, SPRITE_H, containerRef }: UseDragProps) {
  const [dragging, setDragging] = useState(false);
  const lastMouse = useRef<Vec2>({ x: 0, y: 0 });
  const dragOffset = useRef<Vec2>({ x: 0, y: 0 });

  function handleDown(e: React.MouseEvent) {
    setDragging(true);
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      dragOffset.current = {
        x: e.clientX - rect.left - pos.x,
        y: e.clientY - rect.top - pos.y,
      };
    }
    lastMouse.current = { x: e.clientX, y: e.clientY };
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

    const newX = e.clientX - rect.left - dragOffset.current.x;
    const newY = e.clientY - rect.top - dragOffset.current.y;

    lastMouse.current = { x: e.clientX, y: e.clientY };
    setPos(() => ({ x: newX, y: newY }));
    setVel(() => ({ x: dx * 0.7, y: dy * 0.7 }));
  }

  function handleUp() {
    if (dragging) {
      lastThrowTime.current = performance.now();
      if (cryAudio.current && !cryAudio.current.paused) {
        cryAudio.current.pause();
        cryAudio.current.currentTime = 0;
      }
    }
    setDragging(false);
  }

  return {
    dragging,
    handleDown,
    handleMove,
    handleUp,
  };
}
