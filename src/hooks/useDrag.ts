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

type MouseOrTouchEvent = React.MouseEvent | React.TouchEvent;

function getCoords(e: MouseOrTouchEvent): { clientX: number; clientY: number } {
  if ('touches' in e) {
    return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
  }
  return { clientX: e.clientX, clientY: e.clientY };
}

// @ts-ignore
export function useDrag({ pos, setPos, setVel, cryAudio, lastThrowTime, SPRITE_W, SPRITE_H, containerRef }: UseDragProps) {
  const [dragging, setDragging] = useState(false);
  const lastMouse = useRef<Vec2>({ x: 0, y: 0 });
  const dragOffset = useRef<Vec2>({ x: 0, y: 0 });

  function handleDown(e: MouseOrTouchEvent) {
    const { clientX, clientY } = getCoords(e);
    setDragging(true);
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      dragOffset.current = {
        x: clientX - rect.left - pos.x,
        y: clientY - rect.top - pos.y,
      };
    }
    lastMouse.current = { x: clientX, y: clientY };
    cryAudio.current = new Audio(getRandomCrySound());
    cryAudio.current.loop = true;
    cryAudio.current.currentTime = 0;
    cryAudio.current.play().catch(() => {});
  }

  function handleMove(e: MouseOrTouchEvent) {
    if (!dragging) return;

    const { clientX, clientY } = getCoords(e);
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const dx = clientX - lastMouse.current.x;
    const dy = clientY - lastMouse.current.y;

    const newX = clientX - rect.left - dragOffset.current.x;
    const newY = clientY - rect.top - dragOffset.current.y;

    lastMouse.current = { x: clientX, y: clientY };
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
