import { SxProps, Theme } from '@mui/system';

export const boxStyles: SxProps<Theme> = {
  border: '1px solid rgb(30, 54, 105)',
  padding: '16px',
  width: '45vw',
  borderRadius: '8px',
  boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  '@media (max-width: 975px)': {
    width: '70vw',
  },
  '@media (max-width: 600px)': {
    padding: '8px',
    width: '95vw',
  },
};

export const variablesBoxStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: '1vw',
  justifyContent: 'flex-end',
  paddingLeft: '16px',
  width: '100%',
};

export const gridItemHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    justifyContent: 'center',
  },
};

export const buttonStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
  mb: 1,
  '@media (max-width: 600px)': {
    justifyContent: 'center',
    maxWidth: '100%',
    paddingTop: '0px',
  },
};

export const textFieldHeaderKeyStyles: SxProps<Theme> = {
  borderBottom: '1px solid #ccc',
  borderRadius: 0,
  borderBottomLeftRadius: '5px',
  '@media (max-width: 600px)': {
    width: '100%',
    marginBottom: '8px',
  },
};

export const textFieldHeaderValueStyles: SxProps<Theme> = {
  borderBottom: '1px solid #ccc',
  borderRadius: 0,
  borderBottomRightRadius: '5px',
  '@media (max-width: 600px)': {
    width: '100%',
    marginBottom: '8px',
  },
};

export const preBoxStyles: SxProps<Theme> = {
  maxHeight: '300px',
  overflowY: 'auto',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  padding: '10px',
  borderRadius: '4px',
  '@media (max-width: 600px)': {
    padding: '8px',
  },
  '@media (max-width: 350px)': {
    padding: '4px',
  },
};

export const deleteIconStyles: SxProps<Theme> = {
  color: 'grey',
  cursor: 'pointer',
  '&:hover': {
    color: 'black',
  },
};

export const gridItemStyles: SxProps<Theme> = {
  mb: '16px',
  [`@media (max-width: 600px)`]: {
    gridColumn: 'span 12',
    maxWidth: '100%',
  },
};

export const gridContainerStyles: SxProps<Theme> = {
  [`@media (max-width: 450px)`]: {
    display: 'flex',
    flexDirection: 'column',
  },
};
