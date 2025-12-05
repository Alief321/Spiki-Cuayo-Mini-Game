const Cry = ['/sound/cry-drag.mp3', '/sound/angry-full.mp3', '/sound/angry-half.mp3'];

const walk = ['/sound/walk-1.mp3', '/sound/walk-2.mp3', '/sound/walk-3.mp3'];

export function getRandomCrySound(): string {
  const randomIndex = Math.floor(Math.random() * Cry.length);
  return Cry[randomIndex];
}

export function getRandomWalkSound(): string {
  const randomIndex = Math.floor(Math.random() * walk.length);
  return walk[randomIndex];
}
