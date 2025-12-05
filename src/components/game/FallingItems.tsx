import type { FallingItem as FallingItemType } from '@/lib/fallingItems';

interface FallingItemsProps {
  items: FallingItemType[];
}

export function FallingItems({ items }: FallingItemsProps) {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute pointer-events-none transition-transform"
          style={{
            left: item.x,
            top: item.y,
            width: item.size,
            height: item.size,
          }}
        >
          <img src={`/assets/${item.type === 'good' ? 'candy.webp' : 'erpin.webp'}`} className="w-full h-full object-contain drop-shadow-lg animate-bounce" draggable={false} />
        </div>
      ))}
    </>
  );
}
