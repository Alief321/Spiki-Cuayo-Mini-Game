import { useRef, useEffect } from 'react';

export function useAudio() {
  const jumpAudio = useRef<HTMLAudioElement | null>(null);
  const cryAudio = useRef<HTMLAudioElement | null>(null);
  const cryAudio2 = useRef<HTMLAudioElement | null>(null);
  const walkAudio = useRef<HTMLAudioElement | null>(null);
  const bgMusicAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    jumpAudio.current = new Audio('/sound/jump.mp3');
    jumpAudio.current.loop = true;

    cryAudio2.current = new Audio('/sound/cry-drag.mp3');
    cryAudio2.current.loop = true;

    bgMusicAudio.current = new Audio('/sound/background-music.mp3');
    bgMusicAudio.current.loop = true;
    bgMusicAudio.current.volume = 0.3;

    // Initialize walkAudio untuk mobile compatibility
    // Audio instance perlu dibuat di awal agar bisa di-play dari user interaction
    walkAudio.current = new Audio();
    walkAudio.current.preload = 'auto';
  }, []);

  return { jumpAudio, cryAudio, cryAudio2, walkAudio, bgMusicAudio };
}
