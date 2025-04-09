'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  [key: string]: unknown;
  isSimilarity?: boolean;
}

const ImageWithFallback = (props: ImageWithFallbackProps) => {
  const { src, alt, isSimilarity, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const [isNoImage, setIsNoImage] = useState(false);

  return (
    <div className="relative">
      <Image
        width={300}
        height={450}
        src={imgSrc}
        alt={alt}
        {...rest}
        onError={() => {
          setImgSrc('/poster/movie_placeholder.webp');
          setIsNoImage(true);
        }}
      />
      {isNoImage && (
        <p
          className={cn(
            'absolute text-white/40 text-center',
            isSimilarity && 'top-16 -left-28 w-32 text-sm',
            !isSimilarity && 'top-44 left-18',
          )}
          style={{ textShadow: '10px 10px 20px rgba(0, 0, 0, 0.8)' }}
        >
          ポスター画像が
          <br />
          ありません
        </p>
      )}
    </div>
  );
};

export default ImageWithFallback;
