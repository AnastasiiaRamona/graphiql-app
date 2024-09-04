import { useState } from 'react';
import { GraphiQLProvider, DocExplorer } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { Grid, Button, Box, Drawer } from '@mui/material';

export default function SchemaDoc({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <GraphiQLProvider fetcher={createGraphiQLFetcher({ url })}>
      <Box
        className="graphiql-container"
        sx={{ padding: 2, overflow: 'auto', maxWidth: '700px' }}
      >
        <DocExplorer />
      </Box>
    </GraphiQLProvider>
  );
  return (
    <Grid container>
      <Grid item xs={12} textAlign={'center'} sx={{ mt: 2 }}>
        <Button
          onClick={toggleDrawer(true)}
          variant="contained"
          color="primary"
        >
          Open Schema
        </Button>
      </Grid>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </Grid>
  );
}
