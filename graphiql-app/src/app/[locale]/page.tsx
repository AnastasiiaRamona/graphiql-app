'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const locale = urlParams.get('locale') || 'en';
    router.push(`/${locale}/welcome`);
  }, [router]);

  return null;
}
