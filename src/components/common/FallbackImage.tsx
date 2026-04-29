'use client';

import { useTheme } from '@teispace/next-themes';
import Image from 'next/image';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import Logo from '@/assets/logo/stitchery-mark.svg';
import DarkLogo from '@/assets/logo/stitchery-mark-reverse.svg';

type FallbackImageProps = ComponentProps<typeof Image>;

export function FallbackImage({ onError, src, ...props }: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();

  if (hasError || !src) {
    return (
      <div className="flex items-center justify-center h-full">
        <Image src={theme === 'dark' ? DarkLogo : Logo} alt="placeholder" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      {...props}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
    />
  );
}
