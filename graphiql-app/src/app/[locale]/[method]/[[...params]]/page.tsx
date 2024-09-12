'use client';

import {
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  Container,
  Typography,
  Tooltip,
  InputLabel,
  FormControl,
  Box,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useRestfullForm from '../../../../hooks/useRestfullForm';
import {
  boxStyles,
  gridItemHeaderStyles,
  buttonStyles,
  textFieldHeaderKeyStyles,
  textFieldHeaderValueStyles,
  preBoxStyles,
  deleteIconStyles,
  gridItemStyles,
  gridContainerStyles,
  variablesBoxStyles,
} from './restfullFormStyles';
import { useTranslations } from 'next-intl';
import useCheckingOfAuthorization from '@/hooks/useCheckingOfAuthorization';
import Loader from '@/components/Loader/Loader';

import PrettyButton from '../../../../components/PrettyButton/PrettyButton';
function RestfullForm() {
  const {
    method,
    endpoint,
    headers,
    body,
    setBody,
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
  const locale = useTranslations();
  const isEndpointValid = endpoint.trim() === '';

  const theme = useTheme();

  const { loading, isAuthenticated } = useCheckingOfAuthorization();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

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

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={gridContainerStyles}>
            <Grid item xs={4} sx={gridItemStyles}>
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
                        color:
                          methodColors[selected as keyof typeof methodColors],
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
                      sx={{
                        color:
                          methodColors[method as keyof typeof methodColors],
                      }}
                    >
                      {method}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={8} sm={8} sx={gridItemStyles}>
              <TextField
                fullWidth
                id="endpoint"
                label="Endpoint URL"
                variant="outlined"
                value={endpoint}
                onChange={(e) => {
                  const newEndpoint = e.target.value;
                  handleEndpointChange(e);
                  updateUrl(method, newEndpoint);
                }}
              />
            </Grid>

            <Grid item xs={3} sx={gridItemHeaderStyles}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                textAlign={'center'}
              >
                {locale('header')}:
              </Typography>
            </Grid>
            <Grid item xs={9} sx={buttonStyles}>
              <Tooltip title="Add Header" arrow>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddHeader}
                >
                  {locale('addHeader')}
                </Button>
              </Tooltip>
            </Grid>

            {headers.map((header, index) => (
              <Grid container spacing={0} key={index}>
                <Grid item xs={6} sx={{ paddingLeft: '16px' }}>
                  <TextField
                    fullWidth
                    id={`header_key_${index}`}
                    label={locale('headerKey')}
                    variant="outlined"
                    value={header.key}
                    onChange={(e) =>
                      handleHeaderChange(index, 'key', e.target.value)
                    }
                    sx={textFieldHeaderKeyStyles}
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                        borderBottomLeftRadius: '5px',
                        borderTopLeftRadius: '5px',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id={`header_value_${index}`}
                    label={locale('headerValue')}
                    variant="outlined"
                    value={header.value}
                    onChange={(e) =>
                      handleHeaderChange(index, 'value', e.target.value)
                    }
                    sx={textFieldHeaderValueStyles}
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                        borderBottomRightRadius: '5px',
                        borderTopRightRadius: '5px',
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <DeleteIcon
                            sx={deleteIconStyles}
                            onClick={() => {
                              handleRemoveHeader(index);
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: '1px',
                }}
              >
                <TextField
                  fullWidth
                  id="body"
                  label={locale('requestBody')}
                  variant="outlined"
                  multiline
                  rows={4}
                  value={body}
                  onChange={handleBodyChange}
                  onBlur={() => updateUrl(method)}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    mt: 1,
                  }}
                >
                  <PrettyButton
                    content={body}
                    isQuery={false}
                    onChange={(formatted) =>
                      handlePrettierWithVariables(body, false, setBody)
                    }
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sx={buttonStyles}>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleVariablesSection}
              >
                {showVariables
                  ? `${locale('hideVariables')}`
                  : `${locale('showVariables')}`}
              </Button>
            </Grid>

            {showVariables && (
              <>
                <Box sx={variablesBoxStyles}>
                  <Grid item>
                    <Typography variant="h5">{locale('variables')}:</Typography>
                  </Grid>

                  <Grid item sx={buttonStyles}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleAddVariable}
                    >
                      {locale('addVariable')}
                    </Button>
                  </Grid>
                </Box>

                {variables.map((variable, index) => (
                  <Grid
                    container
                    spacing={2}
                    key={index}
                    sx={{ ...gridContainerStyles, paddingLeft: '16px' }}
                  >
                    <Grid item xs={5} sx={gridItemStyles}>
                      <TextField
                        fullWidth
                        id={`variable_key_${index}`}
                        label={locale('variableKey')}
                        variant="outlined"
                        value={variable.key}
                        onChange={(e) =>
                          handleVariableChange(index, 'key', e.target.value)
                        }
                        onBlur={() => updateUrl(method)}
                      />
                    </Grid>
                    <Grid item xs={5} sx={gridItemStyles}>
                      <TextField
                        fullWidth
                        id={`variable_value_${index}`}
                        label={locale('variableValue')}
                        variant="outlined"
                        value={variable.value}
                        onChange={(e) =>
                          handleVariableChange(index, 'value', e.target.value)
                        }
                        onBlur={() => updateUrl(method)}
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          handleRemoveVariable(index);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </>
            )}

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Tooltip title="Submit Request" arrow>
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isEndpointValid}
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
          {responseBody}
        </Box>
      </Box>
    </Container>
  );
}
export default RestfullForm;
