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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useRestfullForm from '../../../../hooks/useRestfullForm';
import {
  containerStyles,
  boxStyles,
  gridItemHeaderStyles,
  buttonStyles,
  textFieldHeaderKeyStyles,
  textFieldHeaderValueStyles,
  preBoxStyles,
  deleteIconStyles,
  gridItemStyles,
  gridContainerStyles,
} from './restfullFormStyles';
import { useTranslations } from 'next-intl';

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
    getColor,
    updateUrl,
    handleRemoveHeader,
    variables,
    showVariables,
    handleVariableChange,
    handleAddVariable,
    toggleVariablesSection,
    handleRemoveVariable,
  } = useRestfullForm();
  const locale = useTranslations();
  const isEndpointValid =
    endpoint.trim() === '' ||
    endpoint.trim() === 'http://' ||
    endpoint.trim() === 'https://';

  return (
    <Container maxWidth="sm" component="main" sx={containerStyles}>
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
                <InputLabel id="method-label">Method</InputLabel>
                <Select
                  labelId="method-label"
                  id="method"
                  value={method}
                  label="Method"
                  onChange={(e) => {
                    handleMethodChange(e);
                    updateUrl(e.target.value);
                  }}
                  variant="outlined"
                  renderValue={(selected) => (
                    <span style={{ color: getColor(selected) }}>
                      {selected}
                    </span>
                  )}
                  sx={{ minWidth: 120 }}
                >
                  <MenuItem value="GET" sx={{ color: 'blue' }}>
                    GET
                  </MenuItem>
                  <MenuItem value="POST" sx={{ color: 'green' }}>
                    POST
                  </MenuItem>
                  <MenuItem value="PUT" sx={{ color: 'orange' }}>
                    PUT
                  </MenuItem>
                  <MenuItem value="PATCH" sx={{ color: 'purple' }}>
                    PATCH
                  </MenuItem>
                  <MenuItem value="DELETE" sx={{ color: 'red' }}>
                    DELETE
                  </MenuItem>
                  <MenuItem value="HEAD" sx={{ color: 'brown' }}>
                    HEAD
                  </MenuItem>
                  <MenuItem value="OPTIONS" sx={{ color: 'teal' }}>
                    OPTIONS
                  </MenuItem>
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
                Header:
              </Typography>
            </Grid>
            <Grid item xs={9} sx={buttonStyles}>
              <Tooltip title="Add Header" arrow>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddHeader}
                >
                  Add Header
                </Button>
              </Tooltip>
            </Grid>

            {headers.map((header, index) => (
              <Grid container spacing={0} key={index}>
                <Grid item xs={6} sx={{ paddingLeft: '16px' }}>
                  <TextField
                    fullWidth
                    id={`header_key_${index}`}
                    label="Header Key"
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
                    label="Header Value"
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
              <TextField
                fullWidth
                id="body"
                label="Request Body"
                variant="outlined"
                multiline
                rows={4}
                value={body}
                onChange={handleBodyChange}
                onBlur={() => updateUrl(method)}
              />
            </Grid>

            <Grid item xs={12} sx={buttonStyles}>
              <Button
                variant="contained"
                color="secondary"
                onClick={toggleVariablesSection}
              >
                {showVariables ? 'Hide Variables' : 'Show Variables'}
              </Button>
            </Grid>

            {showVariables && (
              <>
                <Grid item xs={7}>
                  <Typography variant="h5">Variables:</Typography>
                </Grid>

                <Grid item xs={4} sx={buttonStyles}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddVariable}
                  >
                    Add Variable
                  </Button>
                </Grid>

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
                        label="Variable Key"
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
                        label="Variable Value"
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
                    Send Request
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
          Response
        </Typography>
        <Typography variant="h6">Status: {responseStatus}</Typography>
        <Typography variant="h6">Body:</Typography>
        <Box component="pre" sx={preBoxStyles}>
          {responseBody}
        </Box>
      </Box>
    </Container>
  );
}

export default RestfullForm;
