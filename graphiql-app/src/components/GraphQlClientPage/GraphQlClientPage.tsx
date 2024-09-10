'use client';
import { Container, Typography, Grid } from '@mui/material';
import SchemeDoc from '@/components/SchemeDoc/SchemeDoc';
import GraphQlResponse from '@/components/GraphQlResponse/GraphQlResponse';
import { useEffect } from 'react';
import fetchGraphQL from '@/apiGraphQl/getDataGraphQl';
import useControlGraphQlPage from '@/hooks/useControlGraphQlPage';
import GraphQlTabs from '../TabsGraphQl/TabsGraphQl';
import { useTranslations } from 'next-intl';
import base64 from 'base-64';
import utf8 from 'utf8';
import { toast } from 'react-toastify';
import {
  GraphQlTextInputSdl,
  GraphQlTextInputUrl,
} from './GraphQlTextInput/GraphQlTextInput';

import { GraphQLPageClientProps } from '@/app/[locale]/graphql/[...slug]/types';
import useHistoryStore from '@/store/historyStore';
import { usePathname } from 'next/navigation';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';
import Loader from '../Loader/Loader';
function GraphQLPageСlient({
  params,
  searchParams,
  url,
  bodyBase64,
}: GraphQLPageClientProps) {
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
  const locale = useTranslations();
  const [codeUrl, variablesUrl] = bodyBase64.split('|');
  const codeUrlDecoded = utf8.decode(base64.decode(codeUrl));
  const variablesUrlDecoded = utf8.decode(base64.decode(variablesUrl || ''));
  const urlDecoded = utf8.decode(base64.decode(url || ''));
  const { addRequest } = useHistoryStore();
  const pathname = usePathname();

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
          addRequest(pathname, urlDecoded);
        } catch (error) {
          if (error instanceof Error) {
            setStatus(error.message);
            setData(error.message);
            toast.error(`${locale('errorToast')}: ${error}`);
          }
        }
      };
      fetchData();
    } catch (error) {
      toast.error(`${locale('errorToast')}: ${error}` || locale('error'));
    }
  }, [params, searchParams]);

  const { loading, isAuthenticated } = useCheckingOfAuthorization();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

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
    window.history.replaceState(
      null,
      '',
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
          <GraphQlTextInputUrl
            url={urlDecoded}
            id="endpoint"
            label="Endpoint:"
            register={register}
          />
          <GraphQlTextInputSdl
            onClickSdl={handleSubmit(onClickSdl)}
            id="sdl-url"
            label="SDL URL:"
            register={register}
          />

          <Grid item xs={12}>
            <GraphQlTabs
              value={value}
              code={code}
              variables={variables}
              headers={headers}
              handleChange={handleChange}
              handleCodeChange={handleCodeChange}
              handleVariablesChange={handleVariablesChange}
              handleAddHeader={handleAddHeader}
              handleDeleteHeader={handleDeleteHeader}
              handleHeaderChange={handleHeaderChange}
              handleChangeUrl={handleChangeUrl}
            />
          </Grid>
        </Grid>
      </form>
      <SchemeDoc url={sdl || urlDecoded} />
      <GraphQlResponse data={data} status={status} />
    </Container>
  );
}

export default GraphQLPageСlient;
