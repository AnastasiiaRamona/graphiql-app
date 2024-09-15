'use client';

import React from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  Button,
  Tooltip,
  TextField,
} from '@mui/material';
import useRestfullForm from '../../../../hooks/useRestfullForm';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';
import Loader from '@/components/Loader/Loader';
import MethodSelector from '../../../../components/MethodSelect/MethodSelect';
import HeadersForm from '../../../../components/HeadersSectionRest/HeadersSectionRest';
import BodyForm from '../../../../components/BodySectionRest/BodySectionRest';
import VariablesForm from '../../../../components/VariablesSectionRest/VariablesSectionRest';
import { useTranslations } from 'next-intl';
import {
  boxStyles,
  buttonStyles,
  gridContainerStyles,
  gridItemStyles,
  preBoxStyles,
} from './restfullFormStyles';

function RestfullForm() {
  const {
    method,
    endpoint,
    headers,
    body,
    responseStatus,
    responseBody,
    handleMethodChange,
    handleEndpointChange,
    handleBodyChange,
    handleHeaderChange,
    handleAddHeader,
    handleSubmit,
    updateUrl,
    handleRemoveHeader,
    variables,
    showVariables,
    handleVariableChange,
    handleAddVariable,
    toggleVariablesSection,
    handleRemoveVariable,
    handlePrettierWithVariables,
  } = useRestfullForm();

  const { loading, isAuthenticated } = useCheckingOfAuthorization();
  const locale = useTranslations();

  if (loading) return <Loader />;
  if (!isAuthenticated) return null;

  return (
    <Container
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        gap: '4vh',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: '10vh',
        mb: '4vh',
        '@media (max-width: 450px)': {
          mt: '15vh',
        },
      }}
    >
      <Box sx={boxStyles}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={'center'}
        >
          {locale('restfullClientHeader')}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={gridContainerStyles}>
            <Grid item xs={4} sx={gridItemStyles}>
              <MethodSelector
                method={method}
                handleMethodChange={handleMethodChange}
                updateUrl={updateUrl}
                locale={locale}
              />
            </Grid>
            <Grid item xs={8} sx={gridItemStyles}>
              <TextField
                fullWidth
                label="Endpoint URL"
                value={endpoint}
                onChange={(e) => {
                  const newEndpoint = e.target.value;
                  handleEndpointChange(e);
                  updateUrl(method, newEndpoint);
                }}
              />
            </Grid>

            <HeadersForm
              headers={headers}
              handleHeaderChange={handleHeaderChange}
              handleAddHeader={handleAddHeader}
              handleRemoveHeader={handleRemoveHeader}
              locale={locale}
            />

            <Grid item xs={12}>
              <BodyForm
                body={body}
                handleBodyChange={handleBodyChange}
                handlePrettierWithVariables={handlePrettierWithVariables}
                handleBlur={() => updateUrl(method)}
                locale={locale}
              />
            </Grid>

            <Grid item xs={12}>
              <VariablesForm
                variables={variables}
                showVariables={showVariables}
                handleVariableChange={handleVariableChange}
                handleAddVariable={handleAddVariable}
                toggleVariablesSection={toggleVariablesSection}
                handleRemoveVariable={handleRemoveVariable}
                locale={locale}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Tooltip title="Submit Request" arrow>
                <span>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={!endpoint}
                  >
                    {locale('sendRequest')}
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box sx={boxStyles}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          textAlign={'center'}
        >
          {locale('response')}
        </Typography>
        <Typography variant="h6">
          {locale('status')}: {responseStatus}
        </Typography>
        <Typography variant="h6">{locale('body')}:</Typography>
        <Box component="pre" sx={preBoxStyles}>
          {Array.isArray(responseBody) ? (
            responseBody.map((item, index) => (
              <div key={index}>
                <Typography variant="h6">Title: {item.title}</Typography>
                <Typography variant="body1">Body: {item.body}</Typography>
                <Typography variant="body2">User ID: {item.userId}</Typography>
                <Typography variant="body2">ID: {item.id}</Typography>
              </div>
            ))
          ) : typeof responseBody === 'object' ? (
            <pre>{JSON.stringify(responseBody, null, 2)}</pre>
          ) : (
            responseBody
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default RestfullForm;
