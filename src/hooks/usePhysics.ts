import { useRef, useEffect, useState } from 'react';
import type { Vec2 } from '@/types/Vec2';

const SPRITE_W = 120;
const SPRITE_H = 140;
const SPEED = 1.2;
const GRAV = 0.6;
const GROUND_FRICTION = 0.88;
const AIR_RESISTANCE = 0.98;
const JUMP = -13;
const FAST_DROP = 4;

export function usePhysics() {
  const [pos, setPos] = useState<Vec2>({ x: 150, y: 100 });
  const [vel, setVel] = useState<Vec2>({ x: 0, y: 0 });
  const [facingRight, setFacingRight] = useState(true);
  const [grounded, setGrounded] = useState(false);
  const [jumped, setJumped] = useState(false);
  const frameRef = useRef<number | null>(null);
  const jumpPressed = useRef(false);
  const lastThrowTime = useRef(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Physics tick
  useEffect(() => {
    const tick = () => {
      setVel((prevVel) => {
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

            if (recentlyThrown) {
              nextVel.y = -nextVel.y * 0.7;
            } else {
              nextVel.y = 0;
            }

            ny = Math.max(0, Math.min(ny, r.height - SPRITE_H));
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

  return {
    pos,
    vel,
    setVel,
    setPos,
    facingRight,
    grounded,
    jumped,
    setJumped,
    containerRef,
    jumpPressed,
    lastThrowTime,
    SPEED,
    JUMP,
    FAST_DROP,
    SPRITE_W,
    SPRITE_H,
  };
}
