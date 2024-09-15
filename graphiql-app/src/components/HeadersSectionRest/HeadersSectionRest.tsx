import {
  Grid,
  TextField,
  Button,
  Tooltip,
  InputAdornment,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  buttonStyles,
  deleteIconStyles,
  gridItemHeaderStyles,
  textFieldHeaderKeyStyles,
  textFieldHeaderValueStyles,
} from '@/app/[locale]/[method]/[[...params]]/restfullFormStyles';

interface HeadersSectionProps {
  headers: { key: string; value: string }[];
  handleHeaderChange: (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => void;
  handleAddHeader: () => void;
  handleRemoveHeader: (index: number) => void;
  locale: (key: string) => string;
}

const HeadersSection: React.FC<HeadersSectionProps> = ({
  headers,
  handleHeaderChange,
  handleAddHeader,
  handleRemoveHeader,
  locale,
}) => {
  return (
    <>
      <Grid item xs={3} sx={gridItemHeaderStyles}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          textAlign={'center'}
        >
          {locale('header')}:
        </Typography>
      </Grid>
      <Grid item xs={9} sx={buttonStyles}>
        <Tooltip title="Add Header" arrow>
          <Button variant="contained" color="primary" onClick={handleAddHeader}>
            {locale('addHeader')}
          </Button>
        </Tooltip>
      </Grid>

      {headers.map((header, index) => (
        <Grid container spacing={0} key={index}>
          <Grid item xs={6} sx={{ paddingLeft: '16px' }}>
            <TextField
              fullWidth
              id={`header_key_${index}`}
              label={locale('headerKey')}
              variant="outlined"
              value={header.key}
              onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
              sx={textFieldHeaderKeyStyles}
              InputProps={{
                sx: {
                  borderRadius: 0,
                  borderBottomLeftRadius: '5px',
                  borderTopLeftRadius: '5px',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id={`header_value_${index}`}
              label={locale('headerValue')}
              variant="outlined"
              value={header.value}
              onChange={(e) =>
                handleHeaderChange(index, 'value', e.target.value)
              }
              sx={textFieldHeaderValueStyles}
              InputProps={{
                sx: {
                  borderRadius: 0,
                  borderBottomRightRadius: '5px',
                  borderTopRightRadius: '5px',
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <DeleteIcon
                      sx={deleteIconStyles}
                      onClick={() => {
                        handleRemoveHeader(index);
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default HeadersSection;
