import { logoutUser } from '@/firebase/firebase';
import useAuthStore from '@/store/store';
import { useParams, useRouter } from 'next/navigation';

const useHeaderNavigation = () => {
  const router = useRouter();
  const { setForm, setAuthenticated } = useAuthStore();
  const params = useParams();
  const localeUrl = params.locale || 'en';

  const handleNavigation = async (item: string) => {
    switch (item) {
      case 'Sign in':
      case 'Войти':
        setForm(true);
        router.replace(`/${localeUrl}/authorization`);
        break;
      case 'Sign up':
      case 'Регистрация':
        setForm(false);
        router.replace(`/${localeUrl}/authorization`);
        break;
      case 'Sign out':
      case 'Выйти':
        try {
          await logoutUser();
          setAuthenticated(false);
          router.replace(`/${localeUrl}/welcome`);
        } catch (error) {
          console.error(error);
        }
        break;
      case 'Home':
      case 'Главная':
        router.replace(`/${localeUrl}/welcome`);
        break;
      default:
        break;
    }
  };

  return { handleNavigation };
};

export default useHeaderNavigation;
