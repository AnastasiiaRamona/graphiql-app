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

function RestfullForm() {
  const [method, setMethod] = React.useState('');
  const [body, setBody] = React.useState('');
  const [responseStatus, setResponseStatus] = React.useState('');
  const [responseBody, setResponseBody] = React.useState('');

  const handleMethodChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMethod(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value);
  };

  const getColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'blue';
      case 'POST':
        return 'green';
      case 'PUT':
        return 'orange';
      case 'PATCH':
        return 'purple';
      case 'DELETE':
        return 'red';
      case 'HEAD':
        return 'brown';
      case 'OPTIONS':
        return 'teal';
      default:
        return 'black';
    }
  };

  return (
    <Container
      maxWidth="sm"
      component="main"
      sx={{
        mt: 8,
        marginLeft: '50vw',
        transform: 'translateX(-50%)',
      }}
    >
      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '16px',
          borderRadius: '8px',
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          textAlign={'center'}
        >
          REST Client
        </Typography>

        <form noValidate autoComplete="off">
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
              />
            </Grid>

            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'start' }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                textAlign={'center'}
              >
                Header:
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}
              sx={{ display: 'flex', justifyContent: 'start', mb: 1 }}
            >
              <Tooltip title="Add Header" arrow>
                <Button variant="contained" color="primary" type="submit">
                  Add Header
                </Button>
              </Tooltip>
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs={6} sx={{ paddingLeft: '16px' }}>
                <TextField
                  fullWidth
                  id="header_key"
                  label="Header Key"
                  variant="outlined"
                  sx={{
                    borderBottom: '1px solid #ccc',
                    borderRadius: 0,
                    borderBottomLeftRadius: '5px',
                  }}
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
                  id="header_value"
                  label="Header Value"
                  variant="outlined"
                  sx={{
                    borderBottom: '1px solid #ccc',
                    borderRadius: 0,
                    borderBottomRightRadius: '5px',
                  }}
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

            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Body:
              </Typography>
              <TextField
                fullWidth
                id="body"
                label="JSON/Text Body"
                variant="outlined"
                multiline
                rows={6}
                value={body}
                onChange={handleBodyChange}
              />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary">
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box
        sx={{
          border: '2px solid #ccc',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          textAlign={'center'}
        >
          Response
        </Typography>
        <Typography variant="h5">Status: {responseStatus}</Typography>
        <Typography variant="h5">Body: {responseBody}</Typography>
      </Box>
    </Container>
  );
}

export default RestfullForm;
