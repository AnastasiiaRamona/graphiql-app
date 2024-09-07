import { SxProps, Theme } from '@mui/system';

export const containerStyles: SxProps<Theme> = {
  mt: 8,
  marginLeft: '50vw',
  transform: 'translateX(-50%)',
  '@media (max-width: 600px)': {
    mt: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: 'none',
    width: '100%',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  '@media (max-width: 350px)': {
    mt: 2,
    paddingLeft: '8px',
    paddingRight: '8px',
  },
};

export const boxStyles: SxProps<Theme> = {
  border: '2px solid #ccc',
  padding: '16px',
  borderRadius: '8px',
  mb: 4,
  '@media (max-width: 600px)': {
    padding: '8px',
  },
  '@media (max-width: 350px)': {
    padding: '4px',
  },
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
