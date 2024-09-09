import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useCheckingOfAuthorization = () => {
  const router = useRouter();
  const locale = localStorage.getItem('language') || 'en';
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/${locale}/welcome`);
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [locale, router]);

  return { loading, isAuthenticated };
};

export default useCheckingOfAuthorization;
