import { Box, TextField, Button } from '@mui/material';
import { ChangeEvent } from 'react';
import PrettyButton from '../PrettyButton/PrettyButton';

interface BodySectionProps {
  body: string;
  handleBodyChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlePrettierWithVariables: (
    body: string,
    isQuery: boolean,
    setBody: (body: string) => void
  ) => void;
  handleBlur: () => void;
  locale: (key: string) => string;
}

const BodySection: React.FC<BodySectionProps> = ({
  body,
  handleBodyChange,
  handlePrettierWithVariables,
  handleBlur,
  locale,
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        label={locale('requestBody')}
        variant="outlined"
        multiline
        rows={4}
        value={body}
        onChange={handleBodyChange}
        onBlur={handleBlur}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mt: 0.2,
        }}
      >
        <PrettyButton
          content={body}
          isQuery={false}
          onChange={
            (formatted) =>
              // handlePrettierWithVariables(body, false, (formatted) =>
              handleBodyChange({
                target: { value: formatted },
              } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
            // )
          }
        />
      </Box>
    </Box>
  );
};

export default BodySection;
