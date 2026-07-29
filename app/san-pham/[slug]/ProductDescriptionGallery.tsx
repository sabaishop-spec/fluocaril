'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ProductDescriptionGallery({ images, fallbackImage, productName }: { images: any[], fallbackImage: string, productName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayImages = images && images.length > 0 
    ? images 
    : [{ id: 'fallback', imageUrl: fallbackImage, altText: productName }];
  
  const currentImage = displayImages[activeIndex] || displayImages[0];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <div key={currentImage?.imageUrl} className="relative w-full h-full animate-in fade-in duration-500">
        <Image
          src={currentImage?.imageUrl}
          alt={currentImage?.altText || `${productName} - ảnh mô tả ${activeIndex + 1}`}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {displayImages.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md pointer-events-none backdrop-blur-sm">
            {activeIndex + 1} / {displayImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Xem ảnh mô tả ${idx + 1}`}
              className={`relative aspect-[3/4] w-[64px] sm:w-[72px] shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-start ${
                activeIndex === idx
                  ? "border-transparent ring-2 ring-teal-500 ring-offset-2"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt=""
                fill
                className="object-cover bg-slate-50"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
