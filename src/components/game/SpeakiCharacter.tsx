import { motion } from 'framer-motion';
import type { Vec2 } from '@/types/Vec2';

interface SpeakiCharacterProps {
  pos: Vec2;
  vel: Vec2;
  facingRight: boolean;
  dragging: boolean;
  jumped: boolean;
  isCollision: 'bad' | 'good' | null;
  onMouseDown: (e: React.MouseEvent) => void;
}

export function SpeakiCharacter({ pos, vel, facingRight, dragging, jumped, isCollision, onMouseDown }: SpeakiCharacterProps) {
  return (
    <motion.div
      onMouseDown={onMouseDown}
      animate={{ x: pos.x, y: pos.y, scaleX: facingRight ? -1 : 1 }}
      transition={dragging ? { type: 'tween', duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }}
      className="absolute w-[120px] h-[140px] cursor-grab active:cursor-grabbing origin-center"
    >
      <img src={`/assets/${dragging || isCollision == 'bad' ? 'Speaki-Cry.png' : jumped || isCollision == 'good' ? 'Speaki-Happu.png' : 'Speaki-Cherrful.png'}`} className="w-full h-full object-contain" draggable={false} />
    </motion.div>
  );
}
