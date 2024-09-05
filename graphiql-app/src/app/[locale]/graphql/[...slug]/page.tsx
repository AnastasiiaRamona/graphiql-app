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
import SchemaDoc from '@/components/SchemaDoc/SchemaDoc';
import GraphQlResponse from '@/components/GraphQlResponse/GraphQlResponse';
import { useEffect } from 'react';
import fetchGraphQL from '@/apiGraphQl/getDataGraphQl';
import useControlGraphQlPage from '@/hooks/useControlGraphQlPage';
import base64 from 'base-64';
import utf8 from 'utf8';
import { handlePrettier } from '@/utils/prettufy';
interface GraphQLPageParams {
  locale: string;
  slug: string[];
}

interface GraphQLPageProps {
  params: GraphQLPageParams;
  searchParams: Record<string, string>;
}

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
    handleHeaderChange,
    handleAddHeader,
    handleDeleteHeader,
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
  } = useControlGraphQlPage();
  const [url = '', codeUrl = '', variablesUrl = ''] = params.slug.map(
    (item: string) => decodeURIComponent(item)
  );
  console.log(params);

  useEffect(() => {
    try {
      const urlDecoded = utf8.decode(base64.decode(url || ''));
      const codeUrlDecoded = utf8.decode(base64.decode(codeUrl));
      const variablesUrlDecoded = utf8.decode(base64.decode(variablesUrl));
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
      console.log(error);
    }
  }, [params, searchParams]);

  const onSubmit = async (data: { endpoint: string; sdl?: string }) => {
    const urlBase64 = base64.encode(utf8.encode(data.endpoint));
    const codeBase64 = base64.encode(utf8.encode(code));
    const variablesBase64 = base64.encode(utf8.encode(variables));

    const headersObject = Object.fromEntries(
      headers
        .filter(({ key, value }) => key && value)
        .map(({ key, value }) => [key, value])
    );

    const codedHeaders = new URLSearchParams(headersObject).toString();

    router.push(
      `/${params.locale}/graphql/${urlBase64}/${codeBase64}/${variablesBase64}?${codedHeaders}`
    );
  };

  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{ width: '100%', mt: 12, mb: 3, height: '100%' }}
    >
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        GraphQL
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
        style={{ width: '100%', padding: 7, border: '1px solid #bbdefb' }}
      >
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} gap={0.2} display={'flex'}>
            <TextField
              id="endpoint-url"
              label="Endpoint URL:"
              // defaultValue="https://graphqlzero.almansi.me/api"
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
              Send
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
              Send
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
                <Tab label="Headers " value="1" />
                <Tab label="Query" value="2" />
                <Tab label="Variables" value="3" />
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
                  Add Header
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
                      label="Key:"
                      sx={{ width: '48%' }}
                      value={header.key.trim()}
                      onChange={(e) =>
                        handleHeaderChange(index, 'key', e.target.value)
                      }
                    />
                    <TextField
                      id={`value-header-${index}`}
                      label="Value:"
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
                  sx={{ width: '50px', ml: 'auto', mb: 1 }}
                  onClick={() => handlePrettier(code, true, handleCodeChange)}
                >
                  Pretty
                </Button>
                <CodeMirror
                  value={code}
                  height="200px"
                  theme={darcula}
                  extensions={[graphql()]}
                  onChange={handleCodeChange}
                />
              </TabPanel>
              <TabPanel value="3">
                <Button
                  variant="contained"
                  sx={{ width: '50px', ml: 'auto', mb: 1 }}
                  onClick={() =>
                    handlePrettier(variables, false, handleVariablesChange)
                  }
                >
                  Pretty
                </Button>

                <CodeMirror
                  height="200px"
                  value={variables}
                  theme={darcula}
                  extensions={[graphql()]}
                  onChange={handleVariablesChange}
                />
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      </form>
      <SchemaDoc url={sdl || utf8.decode(base64.decode(url))} />
      <GraphQlResponse data={data} status={status} />
    </Container>
  );
}
// http://localhost:3000/ru/graphql/aHR0cHM6Ly9ncmFwaHFsemVyby5hbG1hbnNpLm1lL2FwaQ==/cXVlcnkgUXVlcnkoJGlkOiBJRCEpIHsKICAgdXNlcihpZDogJGlkKSB7CiAgICAgIHVzZXJuYW1lCiAgICAgIG5hbWUKICAgIH0KICB9/eyAiaWQiOiAiMSIgfQ==?ввв=вввв&іввв=вівівів&іві=вівівіві
export default GraphQLPage;
