import { motion } from 'framer-motion';

interface ScoreboardProps {
  score: number;
  isDarkMode: boolean;
}

export function Scoreboard({ score, isDarkMode }: ScoreboardProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      <div
        className={`bg-gradient-to-br rounded-3xl px-12 py-8 shadow-2xl border-4 border-pink-400 ${isDarkMode ? 'from-indigo-600 via-purple-700 to-blue-800 backdrop-blur-sm ' : 'from-pink-300 via-purple-300 to-blue-300 backdrop-blur-sm '}`}
      >
        <div className="text-center">
          <p className="text-sm font-bold text-white drop-shadow-md mb-2">✨ SCORE ✨</p>
          <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-100 to-white drop-shadow-lg">{score}</p>
        </div>
      </div>
    </motion.div>
  );
}
