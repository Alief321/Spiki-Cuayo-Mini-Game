import { motion } from 'framer-motion';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { BiSolidVolumeMute } from 'react-icons/bi';

interface MusicButtonProps {
  isMusicPlaying: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
}

export function MusicButton({ isMusicPlaying, onToggle, isDarkMode }: MusicButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      animate={{ rotate: isMusicPlaying ? 360 : 0 }}
      transition={{ duration: 3, repeat: isMusicPlaying ? Infinity : 0, ease: 'linear' }}
      className={`absolute top-4 left-4 w-12 h-12  cursor-pointer rounded-full bg-gradient-to-br shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl drop-shadow-md ${
        isDarkMode ? ' from-indigo-400 to-purple-500 text-white' : ' from-yellow-300 to-orange-300 text-gray-900'
      }`}
      title={isMusicPlaying ? 'Matikan musik' : 'Hidupkan musik'}
    >
      {isMusicPlaying ? <IoMusicalNotesSharp /> : <BiSolidVolumeMute />}
    </motion.button>
  );
}
