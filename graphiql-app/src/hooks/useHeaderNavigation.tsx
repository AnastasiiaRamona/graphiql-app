import { logoutUser } from '@/firebase/firebase';
import useAuthStore from '@/store/store';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const useHeaderNavigation = () => {
  const router = useRouter();
  const { setForm, setAuthenticated } = useAuthStore();
  const params = useParams();
  const localeUrl = params?.locale || 'en';
  const locale = useTranslations();

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
          localStorage.clear();
        } catch (error) {
          toast.error(`${locale('errorToast')}: ${error}`);
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
