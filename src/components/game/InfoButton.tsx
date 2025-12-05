import { FaInfoCircle } from 'react-icons/fa';

interface InfoButtonProps {
  isDarkMode: boolean;
  onClick: () => void;
}

export function InfoButton({ isDarkMode, onClick }: InfoButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`absolute bg-gradient-to-br top-4 right-4 w-12 h-12 rounded-full cursor-pointer hover:brightness-90shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-2xl font-bold text-white drop-shadow-md ${
        isDarkMode ? ' from-indigo-400 to-purple-500 text-white' : ' from-yellow-300 to-orange-300 text-gray-900'
      }`}
      title="Info"
    >
      <FaInfoCircle className={`${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
    </button>
  );
}
