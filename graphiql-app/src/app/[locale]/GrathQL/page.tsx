'use client';

import { useState } from 'react';
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
import { json } from '@codemirror/lang-json';

function GraphQLPage() {
  const [value, setValue] = useState('1');
  const [code, setCode] = useState(`query Query($id: ID!) {
 user(id: $id) {
    username
    name    
  }
}`);
  const [varriables, setVariables] = useState(` const variables: {"id": "1"}`);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleCodeChange = (value: string) => {
    console.log(value);
    setCode(value);
  };
  const handleVariablesChange = (value: string) => {
    console.log(value);
    setVariables(value);
  };

  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{ width: '100%', mt: 12, height: '100%' }}
    >
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        GraphQL
      </Typography>
      <form
        autoComplete="off"
        noValidate
        style={{ width: '100%', padding: 7, border: '1px solid #bbdefb' }}
      >
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} gap={0.2} display={'flex'}>
            <TextField
              id="endpoint-url"
              label="Endpoint URL:"
              sx={{ width: '85%' }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '15%', height: '100%' }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12} gap={0.2} display={'flex'}>
            <TextField id="sdl-url" label="SDL URL:" sx={{ width: '85%' }} />
            <Button
              variant="contained"
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
                >
                  Add Header
                </Button>

                <Grid
                  item
                  xs={12}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={1}
                >
                  <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{ width: '4%' }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <TextField
                    id="key-header"
                    label="Key:"
                    sx={{ width: '48%' }}
                  />
                  <TextField
                    id="value-header"
                    label="Value:"
                    sx={{ width: '48%' }}
                  />
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <CodeMirror
                  value={code}
                  height="200px"
                  theme={darcula}
                  extensions={[graphql()]}
                  onChange={handleCodeChange}
                />
              </TabPanel>
              <TabPanel value="3">
                <CodeMirror
                  value={varriables}
                  height="200px"
                  theme={darcula}
                  extensions={[graphql()]}
                  onChange={handleVariablesChange}
                />
              </TabPanel>
            </Grid>
          </TabContext>
        </Grid>
      </form>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            textAlign="center"
          >
            Response
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h1" gutterBottom>
            Status:
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              display={'inline'}
              sx={{ color: '#5be715', ml: 1 }}
            >
              200 OK
            </Typography>
          </Typography>
          <CodeMirror
            value={`${JSON.stringify(response, null, ' ')}`}
            height="400px"
            theme={darcula}
            readOnly
            extensions={[json()]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default GraphQLPage;
const response = {
  data: {
    photo: {
      id: '4',
      title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
      url: 'https://via.placeholder.com/600/d32776',
      thumbnailUrl: 'https://via.placeholder.com/150/d32776',
    },
  },
};
