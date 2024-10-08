'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const locale = localStorage.getItem('language') || 'en';
    const pathname = window.location.pathname;
    if (!pathname.startsWith(`/${locale}`)) {
      router.push(`/${locale}${pathname}`);
    }
  }, []);

  return null;
}
