# 🎮 Spiki Chibi Mini Game

Sebuah game mini yang ceria dengan karakter chibi Speaki! Tangkap jatuhan Speaki yang baik untuk mendapat poin, hindari yang jahat untuk tidak kehilangan poin. Lengkap dengan fitur audio, dark mode, dan papan skor!

## ✨ Fitur Utama

### 🎯 Gameplay

- **Kontrol Keyboard** (Desktop): Gerak kiri/kanan dengan **A/D** atau **Arrow Keys**, **Spasi** untuk lompat
- **Kontrol Mobile**: Tombol di bawah layar untuk **Kiri**, **Lompat**, **Kanan**
- **Drag & Lempar**: Klik/tap dan drag Speaki, lepas untuk melempar dengan physics
- **Responsive**: Otomatis menampilkan kontrol sesuai perangkat (keyboard untuk desktop, buttons untuk mobile)

### ⭐ Sistem Poin

- **Item Baik (Speaki Cheerful 😊)**: +10 poin saat ditangkap
- **Item Jahat (Speaki Cry 😢)**: -5 poin saat ditangkap (dengan warning sound)
- **Jatuh Otomatis**: Setiap 10 detik ada item baru jatuh dari atas
- **Papan Skor**: Tampil di tengah layar dengan style chibi yang ceria
- **Local Storage**: Skor otomatis tersimpan dan di-load saat membuka game

### 🔊 Audio & Musik

- **Background Music**: Musik ambient latar yang menenangkan (volume rendah)
- **Tombol Music Toggle** (🎵/🔇): Di kiri atas untuk on/off musik
- **Sound Effects**:
  - 🚶 Walk sounds: Saat bergerak (3 variasi random)
  - 😢 Cry sounds: Saat di-drag (3 variasi random)
  - ⬆️ Jump sound: Loop saat lompat, stop saat landing
  - ⚠️ Warning sound: One-shot saat collision bad item

### 🌙 Dark Mode

- **Tombol Dark Mode** (☀️/🌙): Di kiri atas untuk ganti tema
- **Auto-detect**: Otomatis pilih dark mode jika OS user pakai dark theme
- **Background dinamis**: Light → `background.png`, Dark → `background-dark.png`
- **Tema Tailwind**: Semua komponen support light & dark mode

### ℹ️ Info Panel

- **Tombol Info** (ℹ️): Di kanan atas untuk buka panduan
- **Panduan Lengkap**: Instruksi kontrol dengan emoji & penjelasan detail
- **Reset Skor**: Tombol untuk mereset skor ke 0 (dengan konfirmasi)
- **Style Chibi**: Modal dengan gradient, border tebal, dan animasi smooth

### 🎨 Desain & UX

- **Chibi Aesthetic**: Karakter kecil imut dengan 3 pose (happy, cry, jump)
- **Smooth Physics**: Gravity realistic, air resistance, friction berbeda saat grounded/airborne
- **Animasi Smooth**: Spring animation untuk movement, bounce effect untuk falling items
- **Mobile Optimized**: Kontrol button-based di bottom untuk layar kecil, tetap support keyboard untuk desktop

## 🎮 Cara Bermain

1. **Mainkan**: Gerakkan Speaki dengan A/D atau Arrow Keys
2. **Lompat**: Tekan Spasi untuk lompat mencapai items yang lebih tinggi
3. **Tangkap Item Baik**: Kumpulkan Speaki yang tersenyum = +10 poin ✨
4. **Hindari Item Jahat**: Jangan kena Speaki yang sedih = -5 poin ⚠️
5. **Lihat Skor**: Pantau papan skor di tengah layar
6. **Hemat Skor**: Score otomatis tersimpan di local storage

## 🛠️ Teknologi

- **React + TypeScript**: Untuk UI & logic yang type-safe
- **Vite**: Build tool yang cepat
- **Tailwind CSS**: Styling dengan dark mode support
- **Framer Motion**: Animasi smooth & natural
- **Web Audio API**: Playback audio effects
- **Local Storage**: Penyimpanan skor persistent

## 📁 Struktur Project

```
src/
├── layouts/
│   └── Spiki.tsx          # Main game component
├── lib/
│   └── randomSound.ts     # Helper untuk random sound selection
├── types/
│   └── Vec2.ts            # Vector type untuk posisi
└── assets/

public/
├── assets/
│   ├── Speaki-Cherrful.png   # Sprite happy
│   ├── Speaki-Cry.png        # Sprite cry
│   ├── Speaki-Happu.png      # Sprite jump
│   ├── background.png        # Light mode bg
│   └── background-dark.png   # Dark mode bg
└── sound/
    ├── jump.mp3
    ├── cry-drag.mp3
    ├── walk-1,2,3.mp3
    ├── angry-full.mp3        # Background music
    └── angry-half.mp3
```

## ⚙️ Config

### Physics

- `SPEED = 1.2`: Kecepatan horizontal
- `GRAV = 0.6`: Gravitasi
- `JUMP = -13`: Impuls lompat
- `GROUND_FRICTION = 0.88`: Friction tanah
- `AIR_RESISTANCE = 0.98`: Resistance udara

### Game

- `FALLING_ITEM_SPAWN = 10s`: Spawn item baru
- `GOOD_ITEM_RATIO = 60%`: Good vs bad items
- `GOOD_SCORE = +10`, `BAD_SCORE = -5`

## 🚀 Quick Start

```bash
npm install
npm run dev
# Buka http://localhost:5173
```

---
