import { logoutUser } from '@/firebase/firebase';
import useAuthStore from '@/store/store';
import { useRouter } from 'next/navigation';

const useHeaderNavigation = () => {
  const router = useRouter();
  const { setForm, setAuthenticated } = useAuthStore();

  const handleNavigation = async (item: string) => {
    switch (item) {
      case 'Sign in':
        setForm(true);
        router.push('/authorization');
        break;
      case 'Sign up':
        setForm(false);
        router.push('/authorization');
        break;
      case 'Sign out':
        try {
          await logoutUser();
          setAuthenticated(false);
          router.push('/welcome');
        } catch (error) {
          console.error(error);
        }
        break;
      default:
        break;
    }
  };

  return { handleNavigation };
};

export default useHeaderNavigation;
