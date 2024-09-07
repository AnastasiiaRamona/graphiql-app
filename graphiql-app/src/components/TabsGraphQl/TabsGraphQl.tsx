import { Grid, Tab, Button, IconButton, TextField } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CodeMirror from '@uiw/react-codemirror';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { graphql } from 'cm6-graphql';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';
import { useTranslations } from 'next-intl';
import type GraphQLTabsProps from './types';

const GraphQlTabs: React.FC<GraphQLTabsProps> = ({
  value,
  headers,
  code,
  variables,
  handleChange,
  handleCodeChange,
  handleVariablesChange,
  handlePrettier,
  handleAddHeader,
  handleDeleteHeader,
  handleHeaderChange,
  handleChangeUrl,
}) => {
  const locale = useTranslations();

  return (
    <TabContext value={value}>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <TabList
          onChange={handleChange}
          aria-label="GraphQL tabs"
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}
        >
          <Tab label={locale('headers')} value="1" />
          <Tab label={locale('query')} value="2" />
          <Tab label={locale('variables')} value="3" />
        </TabList>
      </Grid>
      <Grid item xs={12}>
        <TabPanel value="1" sx={{ width: '100%' }}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AddIcon />}
            sx={{ width: '150px', display: 'flex', ml: 'auto', mb: 1 }}
            onClick={handleAddHeader}
          >
            {locale('addHeader')}
          </Button>

          {headers.map((header, index) => (
            <Grid
              key={index}
              item
              xs={12}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={1}
              sx={{ mt: 1 }}
            >
              <IconButton
                aria-label="delete"
                size="small"
                sx={{ width: '4%' }}
                onClick={() => handleDeleteHeader(index)}
              >
                <DeleteIcon />
              </IconButton>
              <TextField
                id={`key-header-${index}`}
                label={locale('headerKey')}
                sx={{ width: '48%' }}
                value={header.key.trim()}
                onChange={(e) =>
                  handleHeaderChange(index, 'key', e.target.value)
                }
              />
              <TextField
                id={`value-header-${index}`}
                label={locale('headerValue')}
                sx={{ width: '48%' }}
                value={header.value.trim()}
                onChange={(e) =>
                  handleHeaderChange(index, 'value', e.target.value)
                }
              />
            </Grid>
          ))}
        </TabPanel>
        <TabPanel value="2">
          <Button
            variant="contained"
            sx={{ ml: 'auto', mb: 1 }}
            onClick={() => handlePrettier(code, true, handleCodeChange)}
          >
            {locale('pretty')}
            <TouchAppSharpIcon />
          </Button>
          <CodeMirror
            value={code}
            height="200px"
            theme={darcula}
            extensions={[graphql()]}
            onBlur={() => handleChangeUrl(code, variables)}
            onChange={handleCodeChange}
          />
        </TabPanel>
        <TabPanel value="3">
          <Button
            variant="contained"
            sx={{ ml: 'auto', mb: 1 }}
            onClick={() =>
              handlePrettier(variables, false, handleVariablesChange)
            }
          >
            {locale('pretty')}
            <TouchAppSharpIcon />
          </Button>

          <CodeMirror
            height="200px"
            value={variables}
            theme={darcula}
            extensions={[graphql()]}
            onBlur={() => handleChangeUrl(code, variables)}
            onChange={handleVariablesChange}
          />
        </TabPanel>
      </Grid>
    </TabContext>
  );
};

export default GraphQlTabs;
