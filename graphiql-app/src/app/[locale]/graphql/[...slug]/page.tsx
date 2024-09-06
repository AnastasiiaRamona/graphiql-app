'use client';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Tab,
  IconButton,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import CodeMirror from '@uiw/react-codemirror';
import { darcula } from '@uiw/codemirror-theme-darcula';
import { graphql } from 'cm6-graphql';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SchemeDoc from '@/components/SchemeDoc/SchemeDoc';
import GraphQlResponse from '@/components/GraphQlResponse/GraphQlResponse';
import { useEffect } from 'react';
import fetchGraphQL from '@/apiGraphQl/getDataGraphQl';
import useControlGraphQlPage from '@/hooks/useControlGraphQlPage';
import base64 from 'base-64';
import utf8 from 'utf8';
import { handlePrettier } from '@/utils/prettufy';
import { GraphQLPageProps } from './types';
import { useTranslations } from 'next-intl';
import TouchAppSharpIcon from '@mui/icons-material/TouchAppSharp';

function GraphQLPage({ params, searchParams }: GraphQLPageProps) {
  const {
    value,
    status,
    setStatus,
    data,
    setData,
    sdl,
    code,
    variables,
    headers,
    handleChange,
    handleCodeChange,
    onClickSdl,
    handleVariablesChange,
    handleSubmit,
    register,
    router,
    setCode,
    setVariables,
    updateHeaders,
    transformHeaders,
    setHeaders,
  } = useControlGraphQlPage();
  const [url = '', bodyBase64 = ''] = params.slug.map((item: string) =>
    decodeURIComponent(item)
  );
  const [codeUrl, variablesUrl] = bodyBase64.split('|');
  const urlDecoded = utf8.decode(base64.decode(url || ''));
  const codeUrlDecoded = utf8.decode(base64.decode(codeUrl));
  const variablesUrlDecoded = utf8.decode(base64.decode(variablesUrl));
  const locale = useTranslations();

  useEffect(() => {
    try {
      setCode(codeUrlDecoded);
      setVariables(variablesUrlDecoded);
      updateHeaders(searchParams);

      const fetchData = async () => {
        try {
          const response = await fetchGraphQL({
            endpoint: urlDecoded,
            headers: searchParams,
            variables: variablesUrlDecoded,
            code: codeUrlDecoded,
          });

          if (response) {
            setStatus(response.status.toString());
          }

          const json = await response?.json();
          setData(json);
        } catch (error) {
          if (error instanceof Error) {
            setStatus(error.message);
            setData(error.message);
          }
        }
      };
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [params, searchParams]);

  const handleDeleteHeader = (index: number) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
    const codedHeaders = transformHeaders(headers);
    window.history.replaceState(
      null,
      '',
      `/${params.locale}/graphql/${url}/${bodyBase64}?${codedHeaders}`
    );
  };

  const handleChangeUrl = (code: string, variables: string) => {
    const codeBase64 = base64.encode(utf8.encode(code));
    const variablesBase64 = base64.encode(utf8.encode(variables));
    const bodyBase64 = `${codeBase64}|${variablesBase64}`;
    const codedHeaders = transformHeaders(headers);

    router.push(
      `/${params.locale}/graphql/${url}/${bodyBase64}?${codedHeaders}`
    );
  };
  const handleAddHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
    const codedHeaders = transformHeaders(headers);
    window.history.replaceState(
      null,
      '',
      `/${params.locale}/graphql/${url}/${bodyBase64}?${codedHeaders}`
    );
  };
  const handleHeaderChange = (index: number, field: string, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = {
      ...newHeaders[index],
      [field]: value,
    };
    setHeaders(newHeaders);
    const codedHeaders = transformHeaders(headers);
    window.history.replaceState(
      null,
      '',
      `/${params.locale}/graphql/${url}/${bodyBase64}?${codedHeaders}`
    );
  };

  const onSubmit = async (data: { endpoint: string; sdl?: string }) => {
    const urlBase64 = base64.encode(utf8.encode(data.endpoint));
    const codeBase64 = base64.encode(utf8.encode(code));
    const variablesBase64 = base64.encode(utf8.encode(variables));
    const bodyBase64 = `${codeBase64}|${variablesBase64}`;
    const codedHeaders = transformHeaders(headers);

    router.push(
      `/${params.locale}/graphql/${urlBase64}/${bodyBase64}?${codedHeaders}`
    );
  };

  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{ width: '100%', mt: 12, mb: 3, height: '100%' }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        textAlign="center"
        sx={{ fontWeight: 600 }}
      >
        GraphQL
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
        style={{
          width: '100%',
          padding: 16,
          border: '1px solid rgb(30, 54, 105)',
          boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} gap={0.2} display={'flex'}>
            <TextField
              id="endpoint-url"
              label="Endpoint URL:"
              defaultValue={`${utf8.decode(base64.decode(url))}`}
              sx={{ width: '85%' }}
              {...register('endpoint')}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '15%', height: '100%' }}
              endIcon={<SendIcon />}
              type="submit"
            >
              {locale('send')}
            </Button>
          </Grid>
          <Grid item xs={12} gap={0.2} display={'flex'}>
            <TextField
              id="sdl-url"
              label="SDL URL:"
              sx={{ width: '85%' }}
              {...register('sdl')}
            />
            <Button
              variant="contained"
              onClick={handleSubmit(onClickSdl)}
              color="primary"
              sx={{ width: '15%', height: '100%' }}
              endIcon={<SendIcon />}
            >
              {locale('send')}
            </Button>
          </Grid>
          <TabContext value={value}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  width: '100%',
                }}
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
                  sx={{
                    width: '150px',
                    display: 'flex',
                    ml: 'auto',
                    mb: 1,
                  }}
                  onClick={handleAddHeader}
                >
                  {locale('addHeader')}
                </Button>

                {headers.map((header, index) => (
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    gap={1}
                    key={index}
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
        </Grid>
      </form>
      <SchemeDoc url={sdl || urlDecoded} />
      <GraphQlResponse data={data} status={status} />
    </Container>
  );
}
export default GraphQLPage;
