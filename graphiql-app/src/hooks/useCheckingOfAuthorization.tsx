import Loader from '@/components/Loader/Loader';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const useCheckingOfAuthorization = () => {
  const router = useRouter();
  const locale = localStorage.getItem('language') || 'en';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(`/${locale}/welcome`);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [locale, router]);

  if (loading) {
    return <Loader />;
  }

  return null;
};

export default useCheckingOfAuthorization;
