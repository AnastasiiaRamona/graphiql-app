import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const SwitchLanguage = () => {
  const theme = useTheme();
  const router = useRouter();

  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const pathLanguage = window.location.pathname
        .split('/')[1]
        ?.toUpperCase();
      const storedLanguage = localStorage.getItem('language')?.toUpperCase();
      return pathLanguage || storedLanguage || 'EN';
    }
    return 'EN';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language.toLowerCase());
    }
  }, [language]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value as string;
    setLanguage(newLanguage);

    const currentPathname = window.location.pathname;
    const newPathname = currentPathname.replace(
      /^\/(en|ru)/,
      `/${newLanguage}`.toLowerCase()
    );

    router.push(newPathname);
  };

  return (
    <FormControl
      sx={{
        minWidth: 60,
        border: 'none',
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
        '& .MuiSelect-select': {
          padding: '4px 8px',
          color: theme.palette.text.secondary,
        },
      }}
      variant="outlined"
    >
      <Select
        value={language}
        onChange={handleChange}
        displayEmpty
        inputProps={{
          'aria-label': 'Without label',
        }}
      >
        <MenuItem value={'EN'}>EN</MenuItem>
        <MenuItem value={'RU'}>RU</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SwitchLanguage;
