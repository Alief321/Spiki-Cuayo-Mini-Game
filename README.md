# 🎮 Spiki Chibi Mini Game

Sebuah game mini yang ceria dengan karakter chibi Speaki! Tangkap jatuhan Speaki yang baik (Candy) untuk mendapat poin, hindari yang jahat (Erpin) untuk tidak kehilangan poin. Lengkap dengan fitur audio, dark mode, responsif ke mobile, dan papan skor persistent!

## 📺 Demo & Screenshot

### Gameplay Demo
[demo.webm](https://github.com/user-attachments/assets/7e1c96cc-859f-452e-a9fe-b98b40852b0f)
> 🎬 [Link Video Demo](https://drive.google.com/file/d/1ahuGxrkp7T-m_rMRUjfK9Nm91ErxbTQl/view?usp=drive_link) - Demonstrasi gameplay lengkap


### Screenshot

**Desktop View:**

- 💻 Light Mode - UI cerah dengan background biru

  ![dekstop light](/docs/light-mode.png)

- 🌙 Dark Mode - UI gelap dengan background abu-abu

  ![deksto dark](/docs/dark-mode.png)

- ℹ Informasi terkait mekanisme game

  ![info](/docs/info.png)

**Mobile View:**

- 📱 Layout 80/20 split dengan game area & mobile controls terpisah
- 👆 Touch-friendly buttons untuk Kiri, Lompat, Kanan

![light mobile](/docs/mobile-light.jpg)

![light mobile](/docs/mobile-dark.jpg)

## ✨ Fitur Utama

### 🎯 Gameplay

- **Kontrol Keyboard** (Desktop): Gerak kiri/kanan dengan **A/D** atau **Arrow Keys**, **Spasi** untuk lompat
- **Kontrol Mobile**: Tombol di bawah layar untuk **Kiri**, **Lompat**, **Kanan** dengan layout 80% game area & 20% controls
- **Drag & Lempar**: Klik/tap dan drag Speaki, lepas untuk melempar dengan physics realistic
- **Responsive Design**: Otomatis menampilkan kontrol sesuai perangkat (keyboard untuk desktop, buttons untuk mobile)
- **Page Visibility**: Falling items berhenti spawn & animate saat tab tidak aktif (hemat resource CPU)

### ⭐ Sistem Poin & Item Jatuh

#### Item Baik (🍭 Candy) - Speaki Tersenyum Ceria

- **Penampilan**: Karakter Speaki dengan ekspresi ceria & bahagia (Speaki-Cherrful.png)
- **Poin**: **+10 poin** saat ditangkap
- **Sound**: Sound effect positif & cheerful
- **Strategi**: Kejar & tangkap item ini untuk nambah skor
- **Probability**: 60% dari total items yang jatuh

#### Item Jahat (👿 Erpin) - Speaki Kesal Sedih

- **Penampilan**: Karakter Speaki dengan ekspresi sedih & kesal (Speaki-Cry.png)
- **Poin**: **-5 poin** saat ditangkap/tabrakan
- **Sound**: Warning sound & cry effect yang menyedihkan
- **Strategi**: Hindari item ini untuk jaga skor tetap tinggi
- **Probability**: 40% dari total items yang jatuh
- **Penalty**: Mengurangi skor yang sudah dikumpulkan

#### Spawn & Collision System

- **Spawn Interval**: Setiap 2 detik ada item baru jatuh dari atas layar
- **Collision Detection**: Distance-based dengan detection range cukup lebar
- **One-time Collision**: Setiap item hanya counted sekali saat collision
- **Smooth Animation**: Items jatuh smooth dengan physics proper

### 💾 Score Management

- **Papan Skor Real-time**: Tampil di tengah atas layar dengan style chibi yang ceria
- **Local Storage Persistent**: Skor otomatis tersimpan & di-load saat membuka game ulang
- **Reset Skor Feature**: Tombol reset score di info panel dengan konfirmasi dialog
- **Score Limits**: Skor tidak bisa negatif (minimum 0)

### 🔊 Audio & Musik

- **Background Music**: Musik ambient latar yang menenangkan dengan volume rendah
- **Tombol Music Toggle** (🎵/🔇): Di kiri atas untuk on/off musik background
- **Sound Effects Lengkap**:
  - 🚶 **Walk Sounds**: 3 variasi walk sound saat Speaki bergerak horizontal (immediate trigger dari tombol mobile)
  - 😢 **Cry Sounds**: 2 variasi cry sound saat Speaki di-drag/thrown
  - ⬆️ **Jump Sound**: Loop saat lompat, stop otomatis saat landing
  - ✨ **Good Collision**: Positive sound effect saat tangkap Candy
  - ⚠️ **Bad Collision**: Warning sound one-shot saat tabrakan Erpin
- **Smart Audio Management**: Tidak ada overlapping sound, proper cleanup untuk memory efficiency

### 🌙 Dark Mode & Theme

- **Tombol Dark Mode** (☀️/🌙): Di kiri atas untuk toggle tema
- **Auto-detect Theme**: Otomatis pilih dark mode jika OS user pakai dark theme
- **Background Dinamis**:
  - Light Mode: `background.png` (warna cerah & menyenangkan)
  - Dark Mode: `background-dark.png` (warna gelap & nyaman di mata)
- **Tema Tailwind Complete**: Semua komponen (button, modal, text) support light & dark mode dengan smooth transition

### ℹ️ Info Panel & Settings

- **Tombol Info** (ℹ️): Di kanan atas untuk buka panduan game & settings
- **Panduan Lengkap**:
  - Penjelasan sistem poin (Candy +10 vs Erpin -5)
  - Instruksi kontrol keyboard (A/D/Space) & mobile (buttons)
  - Daftar item yang jatuh dengan penjelasan masing-masing
  - Tips & strategi bermain optimal
- **Reset Skor Feature**: Tombol untuk reset skor ke 0 dengan konfirmasi dialog
- **Style Chibi Modern**: Modal dengan gradient border, background blur, smooth animation, scrollable content

### 🎨 Desain & UX

- **Chibi Aesthetic**: Karakter kecil imut Speaki dengan 3 pose berubah:
  - Happy Pose: Saat santai/standing
  - Cry Pose: Saat di-drag/thrown
  - Jump Pose: Saat sedang terbang/lompat
- **Smooth Physics Engine**:
  - Gravity realistic (0.6)
  - Air resistance (0.98)
  - Ground friction (0.88)
  - Jump impulse (-13)
  - Bounce effect saat tabrakan
- **Smooth Animations**:
  - Spring animation untuk character movement
  - Scale animation untuk button interaction
  - Fade animation untuk modal appearance
- **Mobile Optimized**:
  - Layout 80/20 split (80% game area, 20% control buttons)
  - Full viewport optimization dengan 100dvh
  - Touch-friendly buttons dengan visual feedback
  - Responsive untuk semua ukuran layar dari 320px ke atas

## 🎮 Cara Bermain

1. **Buka Game**: Akses halaman di browser (desktop atau mobile)
2. **Pahami Item**:
   - 🍭 **Candy (Speaki Ceria)**: Tangkap untuk +10 poin
   - 👿 **Erpin (Speaki Sedih)**: Hindari untuk -5 poin
3. **Gerakan Speaki**:
   - Desktop: Tekan **A/D** atau **Arrow Keys** untuk kiri/kanan
   - Mobile: Klik tombol **Kiri** / **Kanan** di bawah
4. **Lompat Lebih Tinggi**:
   - Desktop: Tekan **Spasi** untuk lompat
   - Mobile: Klik tombol **Lompat** di bawah
5. **Lempar Speaki** (Optional):
   - Click & drag Speaki ke arah yang diinginkan
   - Lepas untuk melempar dengan trajectory physics
   - Cry sound akan dimainkan saat drag
6. **Kumpulkan Poin**:
   - Tangkap Candy (item baik) untuk +10 poin ✨
   - Hindari Erpin (item jahat) untuk -5 poin ⚠️
7. **Monitor Skor**: Lihat papan skor di tengah atas layar real-time
8. **Auto Save**: Skor otomatis tersimpan di browser local storage

## 🛠️ Teknologi Stack

- **React 18 + TypeScript**: UI component & logic yang type-safe, maintainable, dan scalable
- **Vite**: Build tool modern yang cepat dengan HMR (Hot Module Reload) support
- **Tailwind CSS**: Styling utility-first dengan dark mode built-in support
- **Framer Motion**: Animasi smooth & natural dengan spring physics library
- **Web Audio API**: Playback audio effects dengan kontrol loop, timing, & resource management
- **Local Storage API**: Penyimpanan skor persistent di browser storage
- **Page Visibility API**: Deteksi tab active/inactive untuk optimasi resource (item spawn berhenti saat tab tidak aktif)

## 📁 Struktur Project

```
src/
├── layouts/
│   ├── Spiki.tsx           # Main game component - orchestrator utama
│   └── Main.tsx            # Layout wrapper & routing setup
├── components/
│   ├── game/
│   │   ├── SpeakiCharacter.tsx    # Render sprite Speaki & drag handler
│   │   ├── FallingItems.tsx       # Render falling candy/erpin items
│   │   ├── Scoreboard.tsx         # Display score real-time
│   │   ├── MusicButton.tsx        # Toggle background music on/off
│   │   ├── DarkModeButton.tsx     # Toggle dark/light theme
│   │   ├── InfoButton.tsx         # Open info/settings panel
│   │   ├── InfoModal.tsx          # Game info, tips, & reset score feature
│   │   └── MobileControls.tsx     # Mobile button controls (Kiri/Lompat/Kanan)
│   └── ui/
│       └── loading.tsx
├── hooks/
│   ├── usePhysics.ts       # Physics engine (gravity, collision, bounds checking)
│   ├── useDrag.ts          # Drag & throw mechanics dengan mouse & touch support
│   ├── useKeyboard.ts      # Keyboard & mobile button input handlers
│   ├── useAudio.ts         # Audio element initialization & management
│   ├── useFallingItems.ts  # Item spawn with page visibility, collision detection
│   └── useSoundEffects.ts  # Sound playback helpers & audio utilities
├── lib/
│   ├── fallingItems.ts     # FallingItem type & helper functions
│   ├── randomSound.ts      # Random sound selection function (walk, cry variations)
│   └── utils.ts            # Utility functions
├── types/
│   └── Vec2.ts             # Vector2D type definition untuk physics
└── assets/

public/
├── assets/
│   ├── Speaki-Cherrful.png    # Sprite happy/cheerful (item baik)
│   ├── Speaki-Cry.png         # Sprite cry/sad (item jahat)
│   ├── Speaki-Happu.png       # Sprite jump/happy (sedang lompat)
│   ├── background.png         # Light mode background
│   └── background-dark.png    # Dark mode background
├── sound/
│   ├── jump.mp3               # Sound saat lompat
│   ├── cry-drag.mp3           # Sound saat di-drag (throw)
│   ├── walk-1.mp3             # Walk sound variasi 1
│   ├── walk-2.mp3             # Walk sound variasi 2
│   ├── walk-3.mp3             # Walk sound variasi 3
│   ├── angry-full.mp3         # Background music (full version)
│   └── angry-half.mp3         # Background music (half/alternate version)
└── favicon.ico                # Game favicon

docs/
├── screenshots/               # Folder untuk screenshot demo
└── README.md                  # File dokumentasi lengkap (file ini)
```

## ⚙️ Konfigurasi & Constants

### Physics Engine Configuration

```typescript
SPEED = 1.2; // Kecepatan horizontal movement per input
GRAV = 0.6; // Gravitasi percepatan vertikal (jatuh ke bawah)
JUMP = -13; // Impuls/velocity lompat (negative = upward)
GROUND_FRICTION = 0.88; // Friction saat di tanah (energy loss per tick)
AIR_RESISTANCE = 0.98; // Resistance udara saat terbang
SPRITE_W = 120; // Lebar sprite untuk collision detection
SPRITE_H = 140; // Tinggi sprite untuk collision detection
FAST_DROP = 0.5; // Bonus velocity saat hold arrow down
```

### Game Configuration

```typescript
FALLING_ITEM_SPAWN = 2000ms       // Spawn item baru setiap 2 detik
GOOD_ITEM_RATIO = 0.6 (60%)       // Probabilitas item baik vs jahat (60% good, 40% bad)
COLLISION_CHECK_RANGE = distance  // Distance-based collision detection
GOOD_SCORE = +10                  // Poin untuk item baik (Candy)
BAD_SCORE = -5                    // Poin untuk item jahat (Erpin)
COLLISION_TIMEOUT = 500ms         // Cooldown sebelum item baru bisa di-detect
ITEM_SIZE = 60px                  // Size of falling items
CONTAINER_HEIGHT = 80vh (mobile)  // Game area height pada mobile
CONTROLS_HEIGHT = 20vh (mobile)   // Control buttons area height pada mobile
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server dengan hot reload
npm run dev
# Buka http://localhost:5173

# Build untuk production
npm run build

# Preview production build secara lokal
npm run preview

# Lint code (ESLint)
npm run lint
```

## 🔍 SEO & Meta Information Optimization

- **Meta Tags Lengkap**: Optimized untuk search engines (Google, Bing, etc)
  - `description`: Jelas menjelaskan game & fitur utama
  - `keywords`: Targeting "game mini", "chibi game", "casual game", "browser game"
  - `author`: Metadata creator
  - `robots`: Indexing & follow directives
- **Open Graph Tags**: Preview bagus saat share di social media
  - `og:title`, `og:description`, `og:image` untuk Facebook
  - Social media platforms akan show preview dengan gambar game
- **Twitter Card**: Optimasi untuk sharing di Twitter dengan large image
- **Mobile SEO**:
  - Responsive viewport meta
  - Mobile-friendly design & touch-friendly UI
  - 100dvh untuk full viewport height
- **Performance SEO**:
  - Fast loading dengan Vite
  - Lightweight bundle size
  - Efficient animations dengan Framer Motion
- **Canonical URL**: Prevent duplicate content issues untuk indexing
- **Theme Color**: Browser toolbar color customization pada mobile

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.2.2",
  "tailwindcss": "^3.3.0",
  "framer-motion": "^10.16.4",
  "vite": "^4.5.0",
  "@types/react": "^18.2.37",
  "@types/react-dom": "^18.2.15"
}
```

## 🎨 Browser Support

- **Desktop Browsers**:
  - Chrome 90+ ✅
  - Firefox 88+ ✅
  - Safari 14+ ✅
  - Edge 90+ ✅
- **Mobile Browsers**:
  - iOS Safari 12+ ✅
  - Chrome Android (latest) ✅
  - Samsung Internet (latest) ✅
- **Requirements**:
  - ES6+ JavaScript support
  - Web Audio API support
  - CSS Grid & Flexbox support
  - Touch events support (untuk mobile)

## 🐛 Known Issues & Limitations

- Audio autoplay mungkin diblock di beberapa browser (user click diperlukan first)
- Touch drag mungkin kurang responsive pada beberapa device old-generation
- Page Visibility API tidak 100% supported di semua older browsers (fallback berjalan normal)

## 📝 Credits & Inspiration

Inspired by **[HeroBash14/Cuayo](https://github.com/HeroBash14/Cuayo)** -

## 📜 License

**MIT License** - Feel free to use, modify, dan distribute project ini

## 👨‍💻 Developer

Dibuat dengan oleh **[Alief321](https://github.com/Alief321)**

**Last Updated**: December 5, 2025

---

**Enjoy the game! 🎮✨**
