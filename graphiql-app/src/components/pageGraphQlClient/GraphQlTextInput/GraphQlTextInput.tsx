'use client';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslations } from 'next-intl';
import { FormData } from '@/hooks/useControlGraphQlPage';
import { UseFormRegister } from 'react-hook-form';

interface GraphQlTextInputProps {
  id: string;
  label: string;
  register: UseFormRegister<FormData>;
  url?: string;
  onClickSdl?: () => void;
}

export function GraphQlTextInputUrl({
  url,
  register,
  id,
  label,
}: GraphQlTextInputProps) {
  const locale = useTranslations();
  return (
    <Grid item xs={12} gap={0.2} display={'flex'}>
      <TextField
        id={id}
        label={label}
        defaultValue={url}
        sx={{ width: '85%' }}
        {...register('endpoint')}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ minWidth: '13%', height: '100%', fontSize: '0.7rem' }}
        endIcon={<SendIcon />}
        type="submit"
      >
        {locale('send')}
      </Button>
    </Grid>
  );
}
export function GraphQlTextInputSdl({
  onClickSdl,
  register,
  id,
  label,
}: GraphQlTextInputProps) {
  const locale = useTranslations();
  return (
    <Grid item xs={12} gap={0.2} display={'flex'}>
      <TextField
        id={id}
        label={label}
        sx={{ width: '85%' }}
        {...register('sdl')}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ minWidth: '13%', height: '100%', fontSize: '0.7rem' }}
        endIcon={<SendIcon />}
        type="submit"
        onClick={onClickSdl}
      >
        {locale('send')}
      </Button>
    </Grid>
  );
}
