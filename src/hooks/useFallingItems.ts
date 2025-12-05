import { useRef, useEffect, useState } from 'react';
import type { FallingItem } from '@/lib/FallingItems';

interface UseFallingItemsProps {
  pos: { x: number; y: number };
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  onCollision: (type: 'good' | 'bad') => void;
  SPRITE_W: number;
  SPRITE_H: number;
}

export function useFallingItems({ pos, containerRef, onCollision, SPRITE_W, SPRITE_H }: UseFallingItemsProps) {
  const [fallingItems, setFallingItems] = useState<FallingItem[]>([]);
  const nextItemIdRef = useRef(0);
  const fallingItemIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const collidedItemsRef = useRef<Set<number>>(new Set());

  // Spawn falling items every 10 seconds
  useEffect(() => {
    fallingItemIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const randomX = Math.random() * (rect.width - 60);
        const itemType = Math.random() > 0.4 ? 'good' : 'bad';
        const newItem: FallingItem = {
          id: nextItemIdRef.current++,
          x: randomX,
          y: -60,
          size: 60,
          type: itemType,
        };
        setFallingItems((prev) => [...prev, newItem]);
      }
    }, 2000);

    return () => {
      if (fallingItemIntervalRef.current) {
        clearInterval(fallingItemIntervalRef.current);
      }
    };
  }, [containerRef]);

  // Animate falling items and check collisions
  useEffect(() => {
    let animationFrameId: number;

    const fallTick = () => {
      setFallingItems((prevItems) => {
        const containerHeight = containerRef.current?.getBoundingClientRect().height || 800;

        return prevItems
          .map((item) => ({
            ...item,
            y: item.y + 2.5,
          }))
          .filter((item) => {
            const distX = Math.abs(item.x + item.size / 2 - (pos.x + SPRITE_W / 2));
            const distY = Math.abs(item.y + item.size / 2 - (pos.y + SPRITE_H / 2));
            const collision = distX < SPRITE_W / 2 + item.size / 2 && distY < SPRITE_H / 2 + item.size / 2;

            if (collision) {
              // Only trigger collision once per item
              if (!collidedItemsRef.current.has(item.id)) {
                collidedItemsRef.current.add(item.id);
                onCollision(item.type);
              }
              return false;
            }

            return item.y < containerHeight;
          });
      });

      animationFrameId = requestAnimationFrame(fallTick);
    };

    animationFrameId = requestAnimationFrame(fallTick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [pos.x, pos.y, SPRITE_W, SPRITE_H, containerRef, onCollision]);

  return { fallingItems };
}
