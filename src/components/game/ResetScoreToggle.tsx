import { motion } from 'framer-motion';
import { GrPowerReset } from 'react-icons/gr';

interface ResetScoreProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ResetScore({ isDarkMode, onToggle }: ResetScoreProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute bg-gradient-to-br cursor-pointer top-4 right-20 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-2xl drop-shadow-md  ${
        isDarkMode ? ' from-indigo-400 to-purple-500 text-white' : ' from-yellow-300 to-orange-300 text-gray-900'
      }`}
      title={'Reset Score'}
    >
      <GrPowerReset />
    </motion.button>
  );
}
