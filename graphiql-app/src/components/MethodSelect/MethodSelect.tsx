import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface MethodSelectProps {
  method: string;
  handleMethodChange: (e: SelectChangeEvent<string>) => void;
  updateUrl: (method: string) => void;
  locale: (key: string) => string;
}

const MethodSelect: React.FC<MethodSelectProps> = ({
  method,
  handleMethodChange,
  updateUrl,
  locale,
}) => {
  const theme = useTheme();

  const methodColors = {
    GET: theme.palette.info.main,
    POST: theme.palette.success.main,
    PUT: theme.palette.warning.main,
    PATCH: theme.palette.primary.main,
    DELETE: theme.palette.error.main,
    HEAD: theme.palette.text.primary,
    OPTIONS: theme.palette.success.dark,
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="method-label">{locale('method')}</InputLabel>
      <Select
        labelId="method-label"
        id="method"
        value={method}
        label={locale('method')}
        onChange={(e) => {
          handleMethodChange(e);
          updateUrl(e.target.value);
        }}
        variant="outlined"
        renderValue={(selected) => (
          <span
            style={{
              color: methodColors[selected as keyof typeof methodColors],
            }}
          >
            {selected}
          </span>
        )}
        sx={{ minWidth: 120 }}
      >
        {Object.keys(methodColors).map((method) => (
          <MenuItem
            key={method}
            value={method}
            sx={{ color: methodColors[method as keyof typeof methodColors] }}
          >
            {method}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MethodSelect;
