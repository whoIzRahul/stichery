'use client';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function NavigationResetKey({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} style={{ display: 'contents' }}>
      {children}
    </div>
  );
}
