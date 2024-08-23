'use client';

import { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Tooltip,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import schema, { User } from '@/validation/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginUser, registerUser } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';
import AccountCircle from '@mui/icons-material/AccountCircle';
import useAuthStore from '@/store/store';

function AuthorizationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoginForm, toggleForm } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const router = useRouter();

  const onSubmit = async (data: User) => {
    if (isLoginForm) {
      try {
        await loginUser(data.email, data.password);
        router.push('/welcome');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        if (!data.username) {
          return;
        }
        await registerUser(data.email, data.password, data.username);
        router.push('/welcome');
      } catch (error) {
        console.error(error);
      }
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
      sx={{ mt: 8, backgroundColor: 'white', padding: '2rem' }}
    >
      <LockIcon
        sx={{ fontSize: 40, display: 'block', mx: 'auto' }}
        color="primary"
      />
      <Typography variant="h4" component="h1" gutterBottom textAlign={'center'}>
        {isLoginForm ? 'Sign in' : 'Sign up'}
      </Typography>
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
            <Tooltip title={isLoginForm ? 'Sign in' : 'Sign up'} arrow>
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValid}
                >
                  {isLoginForm ? 'Sign in' : 'Sign up'}
                </Button>
              </span>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={toggleForm}>
              {isLoginForm
                ? 'No account? Sign up'
                : 'Have a current account? Sign in'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default AuthorizationForm;
