import { motion } from 'framer-motion';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onResetScore?: () => void;
}

export function InfoModal({ isOpen, onClose, isDarkMode, onResetScore }: InfoModalProps) {
  if (!isOpen) return null;

  const handleResetScore = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset skor? Tindakan ini tidak bisa dibatalkan.')) {
      onResetScore?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0" />
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-gradient-to-br rounded-3xl p-8 shadow-2xl max-w-sm mx-4 border-4 ${
          isDarkMode ? 'from-indigo-100 via-purple-100 to-pink-100 border-purple-300' : 'from-yellow-100 via-orange-100 to-pink-100 border-yellow-300'
        }`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-red-400 rounded-full text-white font-bold text-lg hover:bg-red-500 transition-colors">
          ✕
        </button>

        <h2 className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r mb-4 ${isDarkMode ? 'from-indigo-400 to-purple-500' : 'from-yellow-500 to-orange-400'}`}>Cara Bermain Speaki 🎮</h2>

        <div className="space-y-4 text-sm text-gray-700 max-h-96 overflow-y-auto">
          {/* Scoring Section */}
          <div className={`p-3 rounded-xl border-2 ${isDarkMode ? 'border-indigo-300 bg-indigo-50' : 'border-yellow-300 bg-yellow-50'}`}>
            <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500 mb-2">⭐ Sistem Poin</p>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <img src="/assets/candy.webp" alt="Candy" className="inline w-4 h-4 mr-1" />
                <strong>Candy</strong> +10 Poin
              </p>
              <p className="flex items-center gap-2">
                <img src="/assets/erpin.webp" alt="Erpin" className="inline w-4 h-4 mr-1" />
                <strong>Erpin :</strong> -5 Poin
              </p>
              <p className="text-xs text-gray-600 italic mt-1">Tangkap item yang jatuh untuk menambah atau mengurangi skormu!</p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="space-y-2">
            <p className="font-bold text-pink-600 text-lg mb-2">🕹️ Kontrol</p>

            <div className="flex items-start gap-2">
              <span className="text-lg">⌨️</span>
              <div className="text-xs">
                <p className="font-bold">Gerak Kiri/Kanan</p>
                <p>
                  <strong>A / ← Arrow</strong> kiri | <strong>D / → Arrow</strong> kanan
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-lg">⬆️</span>
              <div className="text-xs">
                <p className="font-bold">Lompat</p>
                <p>
                  Tekan <strong>Spasi</strong> untuk lompat (1x per tekan)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-lg">⬇️</span>
              <div className="text-xs">
                <p className="font-bold">Turun Cepat</p>
                <p>
                  Tekan <strong>↓ Arrow</strong> untuk jatuh lebih cepat
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-lg">🖱️</span>
              <div className="text-xs">
                <p className="font-bold">Drag & Lempar</p>
                <p>Klik tahan Speaki, geser mouse, lepas untuk melempar</p>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className={`p-3 rounded-xl border-2 ${isDarkMode ? 'border-purple-300 bg-purple-50' : 'border-orange-300 bg-orange-50'}`}>
            <p className="font-bold text-pink-600 text-lg mb-2">🎁 Item Yang Jatuh</p>
            <p className="text-xs text-gray-600 mb-2">Setiap 10 detik, item akan jatuh dari atas!</p>
            <div className="flex gap-2 text-xs">
              <div className="flex-1">
                <p className="font-bold text-green-600">
                  <img src="/assets/candy.webp" alt="Candy" className="inline w-4 h-4 mr-1" /> Candy (60%)
                </p>
                <p className="text-gray-600">+10 poin</p>
              </div>
              <div className="flex-1">
                <p className="font-bold text-red-600">
                  <img src="/assets/erpin.webp" alt="Erpin" className="inline w-4 h-4 mr-1" /> Erpin (40%)
                </p>
                <p className="text-gray-600">-5 poin</p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className={`p-3 rounded-xl border-2 ${isDarkMode ? 'border-green-300 bg-green-50' : 'border-lime-300 bg-lime-50'}`}>
            <p className="font-bold text-green-600">💡 Tips</p>
            <ul className="text-xs text-gray-600 space-y-1 mt-1">
              <li>✓ Skormu disimpan secara otomatis!</li>
              <li>✓ Gunakan drag untuk mengontrol posisi Speaki</li>
              <li>✓ Hindari item buruk sebisa mungkin</li>
            </ul>
          </div>

          {/* Reset Score Section */}
          <div className={`p-3 rounded-xl border-2 ${isDarkMode ? 'border-red-300 bg-red-50' : 'border-red-300 bg-red-50'}`}>
            <p className="font-bold text-red-600 mb-2">🔄 Reset Skor</p>
            <button onClick={handleResetScore} className="w-full px-4 py-2 bg-gradient-to-r from-red-400 to-red-500 text-white font-bold rounded-lg hover:from-red-500 hover:to-red-600 transition-all text-sm">
              Reset Skor ke 0
            </button>
            <p className="text-xs text-gray-600 mt-2 italic">⚠️ Tindakan ini akan menghapus semua skor yang telah disimpan!</p>
          </div>
        </div>

        <div className={`mt-4 p-3 rounded-2xl border-2 ${isDarkMode ? 'border-purple-300' : 'border-yellow-300'}`}>
          <p className="text-xs text-gray-600 text-center italic">✨ Selamat bermain dengan Speaki Cuayooo! ✨</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
