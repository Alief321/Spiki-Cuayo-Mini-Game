import { motion } from 'framer-motion';

interface DarkModeButtonProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function DarkModeButton({ isDarkMode, onToggle }: DarkModeButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute cursor-pointer bg-gradient-to-br top-4 left-20 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl drop-shadow-md ${
        isDarkMode ? ' from-indigo-400 to-purple-500' : ' from-yellow-300 to-orange-300'
      }`}
      title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
    >
      {isDarkMode ? '🌙' : '☀️'}
    </motion.button>
  );
}
