'use client';
import './restfull.module.css';
import React from 'react';
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
} from '@mui/material';
import useRestfullForm from './useRestfullForm';
import {
  containerStyles,
  boxStyles,
  gridItemHeaderStyles,
  buttonStyles,
  textFieldHeaderKeyStyles,
  textFieldHeaderValueStyles,
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
    getColor,
    updateUrl,
  } = useRestfullForm();

  return (
    <Container maxWidth="sm" component="main" sx={containerStyles}>
      <Box sx={boxStyles}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={'center'}
        >
          REST Client
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="method-label">Method</InputLabel>
                <Select
                  labelId="method-label"
                  id="method"
                  value={method}
                  label="Method"
                  onChange={handleMethodChange}
                  onBlur={() => updateUrl(method)}
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

            <Grid item xs={8}>
              <TextField
                fullWidth
                id="endpoint"
                label="Endpoint URL"
                variant="outlined"
                value={endpoint}
                onChange={handleEndpointChange}
                onBlur={() => updateUrl(method)}
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
                    onBlur={() => updateUrl(method)}
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
                <Grid item xs={6} sx={{ paddingRight: '16px' }}>
                  <TextField
                    fullWidth
                    id={`header_value_${index}`}
                    label="Header Value"
                    variant="outlined"
                    value={header.value}
                    onChange={(e) =>
                      handleHeaderChange(index, 'value', e.target.value)
                    }
                    onBlur={() => updateUrl(method)}
                    sx={textFieldHeaderValueStyles}
                    InputProps={{
                      sx: {
                        borderRadius: 0,
                        borderBottomRightRadius: '5px',
                        borderTopRightRadius: '5px',
                      },
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

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Tooltip title="Submit Request" arrow>
                <Button variant="contained" color="primary" type="submit">
                  Send Request
                </Button>
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
