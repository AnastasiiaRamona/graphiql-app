import { Box, Typography } from '@mui/material';

interface ResponseSectionProps {
  responseStatus: string;
  responseBody: string;
  locale: (key: string) => string;
}

const ResponseSection: React.FC<ResponseSectionProps> = ({
  responseStatus,
  responseBody,
  locale,
}) => {
  return (
    <Box>
      <Typography variant="h5" textAlign={'center'}>
        {locale('response')}
      </Typography>
      <Typography variant="h6">
        {locale('status')}: {responseStatus}
      </Typography>
      <Typography variant="h6">{locale('body')}:</Typography>
      <Box component="pre">{responseBody}</Box>
    </Box>
  );
};

export default ResponseSection;
