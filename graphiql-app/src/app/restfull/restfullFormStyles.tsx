import { SxProps, Theme } from '@mui/system';

export const containerStyles: SxProps<Theme> = {
  mt: 8,
  marginLeft: '50vw',
  transform: 'translateX(-50%)',
};

export const boxStyles: SxProps<Theme> = {
  border: '2px solid #ccc',
  padding: '16px',
  borderRadius: '8px',
  mb: 4,
};

export const gridItemHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
};

export const buttonStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
  mb: 1,
};

export const textFieldHeaderKeyStyles: SxProps<Theme> = {
  borderBottom: '1px solid #ccc',
  borderRadius: 0,
  borderBottomLeftRadius: '5px',
};

export const textFieldHeaderValueStyles: SxProps<Theme> = {
  borderBottom: '1px solid #ccc',
  borderRadius: 0,
  borderBottomRightRadius: '5px',
};

export const preBoxStyles: SxProps<Theme> = {
  maxHeight: '300px',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  padding: '10px',
  borderRadius: '4px',
};

export const deleteIconStyles: SxProps<Theme> = {
  color: 'grey',
  cursor: 'pointer',
  '&:hover': {
    color: 'black',
  },
};
