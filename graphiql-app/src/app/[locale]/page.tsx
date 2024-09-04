'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const locale = localStorage.getItem('language') || 'en';
    // router.push(`/${locale}welcome/`);
    router.push(`/${locale}/`);
  }, [router]);

  return null;
}
