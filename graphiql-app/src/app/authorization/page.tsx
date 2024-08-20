'use client';
import './registration.module.css';
import React from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Tooltip,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useForm } from 'react-hook-form';
import schema, { User } from '@/validation/shema';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '@/firebase/firebase';
import { useRouter } from 'next/navigation';

function RegistrationForm() {
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
    const user = await registerUser(data.email, data.password);
    try {
      console.log(user);
      router.push('/RESTfull');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" component="main" sx={{ mt: 8 }}>
      <LockIcon
        sx={{ fontSize: 40, display: 'block', mx: 'auto' }}
        color="primary"
      />
      <Typography variant="h4" component="h1" gutterBottom textAlign={'center'}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              helperText={errors.email?.message}
              error={!!errors.email?.message}
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
              type="password"
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              {...register('password')}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tooltip title="Register" arrow>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid}
              >
                Register
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default RegistrationForm;
