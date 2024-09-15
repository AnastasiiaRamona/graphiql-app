'use client';

import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import schema, { User } from '@/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { auth, loginUser, registerUser } from '@/firebase/firebase';
import { useParams, useRouter } from 'next/navigation';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuthStore from '@/store/store';
import { useTranslations } from 'next-intl';
import { onAuthStateChanged } from 'firebase/auth';
import Loader from '@/components/Loader/Loader';

function AuthorizationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoginForm, toggleForm } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const locale = useTranslations();
  const { setAuthenticated } = useAuthStore();
  const params = useParams();
  const localeUrl = params?.locale || 'en';
  const [loading, setLoading] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        router.replace(`/${localeUrl}/welcome`);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [localeUrl, router, setAuthenticated]);

  if (loading) {
    return <Loader />;
  }

  const onSubmit = async (data: User) => {
    try {
      if (isLoginForm) {
        await loginUser(data.email, data.password);
        router.replace(`/${localeUrl}/welcome`);
      } else {
        if (!data.username) {
          setError('Username is required.');
          return;
        }
        await registerUser(data.email, data.password, data.username);
        router.replace(`/${localeUrl}/welcome`);
      }
    } catch (error) {
      setError(
        isLoginForm ? `${locale('loginError')}` : `${locale('registerError')}`
      );
    }
  };

  const handleTogglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Container
      maxWidth="sm"
      component="main"
      sx={{
        mt: 8,
        padding: '2rem',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <LockIcon
        sx={{ fontSize: 40, display: 'block', mx: 'auto' }}
        color="primary"
      />
      <Typography variant="h4" component="h1" gutterBottom textAlign={'center'}>
        {isLoginForm ? `${locale('signIn')}` : `${locale('signUp')}`}
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Grid container spacing={3}>
          {!isLoginForm && (
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                helperText={errors.username?.message}
                autoComplete="username"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" sx={{ mr: -0.5 }}>
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                {...register('username')}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              helperText={errors.email?.message}
              error={!!errors.email?.message}
              autoComplete="email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: -0.5 }}>
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              {...register('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              autoComplete="current-password"
              {...register('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip
              title={
                isLoginForm ? `${locale('signIn')}` : `${locale('signUp')}`
              }
              arrow
            >
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoginForm ? `${locale('signIn')}` : `${locale('signUp')}`}
                </Button>
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={toggleForm}>
              {isLoginForm
                ? `${locale('questionAboutSignUp')}`
                : `${locale('questionAboutSignIn')}`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AuthorizationForm;
