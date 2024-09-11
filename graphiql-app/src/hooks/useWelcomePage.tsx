import { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import useAuthStore from '@/store/store';

export const useWelcomePage = () => {
  const { setAuthenticated, isAuthenticated } = useAuthStore();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || '');
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      setShowScrollUp(scrollTop > 100);
      setShowScrollDown(scrollTop + clientHeight < scrollHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setAuthenticated]);

  const scrollByVH = (direction: number) => {
    window.scrollBy({
      top: direction * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return {
    userName,
    loading,
    isAuthenticated,
    showScrollUp,
    showScrollDown,
    scrollByVH,
  };
};
