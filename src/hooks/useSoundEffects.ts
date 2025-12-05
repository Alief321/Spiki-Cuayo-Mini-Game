import { useEffect } from 'react';

export function useJumpAudio(grounded: boolean, jumpAudio: React.MutableRefObject<HTMLAudioElement | null>) {
  useEffect(() => {
    if (grounded && jumpAudio.current && !jumpAudio.current.paused) {
      jumpAudio.current.pause();
      jumpAudio.current.currentTime = 0;
    }
  }, [grounded, jumpAudio]);
}

export function useBackgroundMusic(isMusicPlaying: boolean, bgMusicAudio: React.MutableRefObject<HTMLAudioElement | null>) {
  useEffect(() => {
    if (bgMusicAudio.current) {
      if (isMusicPlaying && bgMusicAudio.current.paused) {
        bgMusicAudio.current.play().catch(() => {});
      } else if (!isMusicPlaying && !bgMusicAudio.current.paused) {
        bgMusicAudio.current.pause();
      }
    }
  }, [isMusicPlaying, bgMusicAudio]);
}

export function playCollisionSound(audio: React.MutableRefObject<HTMLAudioElement | null>, isLooping: boolean) {
  if (audio.current) {
    const wasLooping = audio.current.loop;
    audio.current.loop = false;
    audio.current.currentTime = 0;
    audio.current.play().catch(() => {});
    audio.current.onended = () => {
      if (audio.current) {
        audio.current.loop = wasLooping;
      }
    };
  }
}
