import { Grid, Typography, useTheme } from '@mui/material';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { useTranslations } from 'next-intl';

interface GraphQlResponseProps {
  status: string;
  data: object;
}

export default function GraphQlResponse({
  status,
  data,
}: GraphQlResponseProps) {
  const locale = useTranslations();
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ mt: 2 }} className="response-graphqQl">
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          {locale('response')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2" gutterBottom>
          {locale('status')}:
          <Typography
            variant="h6"
            component="span"
            gutterBottom
            display={'inline'}
            sx={{
              color:
                status === '200'
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              ml: 1,
            }}
          >
            {status}
          </Typography>
        </Typography>
        <CodeMirror
          value={`${JSON.stringify(data, null, 2)}`}
          height="400px"
          theme={darcula}
          readOnly
          extensions={[json()]}
        />
      </Grid>
    </Grid>
  );
}
