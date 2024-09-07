import { useEffect } from 'react';
import { getIdToken, onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { toast } from 'react-toastify';

const TOKEN_CHECK_INTERVAL = 55 * 60 * 1000;

const useTokenRefresh = () => {
  useEffect(() => {
    const checkToken = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          await getIdToken(user, true);
        } catch (error) {
          toast.error(`${error}`);
        }
      }
    };
    checkToken();
    const intervalId = setInterval(checkToken, TOKEN_CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        await user.getIdToken();
      }
    });

    return () => unsubscribe();
  }, []);
};

export default useTokenRefresh;
