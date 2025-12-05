import { motion } from 'framer-motion';

interface MobileControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onJump: () => void;
  onJumpRelease: () => void;
  isDarkMode: boolean;
}

export function MobileControls({ onMoveLeft, onMoveRight, onJump, onJumpRelease, isDarkMode }: MobileControlsProps) {
  const buttonBaseClass = `font-bold text-lg rounded-lg shadow-lg active:scale-90 transition-transform px-4 py-3`;
  const darkButtonClass = isDarkMode
    ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700'
    : 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600';

  return (
    <div className="flex justify-center items-center gap-4 px-4 w-full h-full pointer-events-auto scale-y-[-1]">
      {/* Left Button */}
      <motion.button onMouseDown={onMoveLeft} onTouchStart={onMoveLeft} whileTap={{ scale: 0.9 }} className={`${buttonBaseClass} ${darkButtonClass}`} title="Gerak Kiri">
        ⬅️ Kiri
      </motion.button>

      {/* Jump Button */}
      <motion.button onMouseDown={onJump} onMouseUp={onJumpRelease} onMouseLeave={onJumpRelease} onTouchStart={onJump} onTouchEnd={onJumpRelease} whileTap={{ scale: 0.9 }} className={`${buttonBaseClass} ${darkButtonClass}`} title="Lompat">
        ⬆️ Lompat
      </motion.button>

      {/* Right Button */}
      <motion.button onMouseDown={onMoveRight} onTouchStart={onMoveRight} whileTap={{ scale: 0.9 }} className={`${buttonBaseClass} ${darkButtonClass}`} title="Gerak Kanan">
        Kanan ➡️
      </motion.button>
    </div>
  );
}
