import { Button } from '@mui/material';
import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';
import { useTranslations } from 'next-intl';
import PrettyButtonProps from './types';
import { handlePrettier } from '../../utils/prettify';

const PrettyButton: React.FC<PrettyButtonProps> = ({
  content,
  isQuery,
  onChange,
}) => {
  const locale = useTranslations();

  return (
    <Button
      variant="contained"
      sx={{ ml: 'auto', mb: 1 }}
      onClick={() => handlePrettier(content, isQuery, onChange)}
    >
      {locale('pretty')}
      <TouchAppSharpIcon />
    </Button>
  );
};

export default PrettyButton;
