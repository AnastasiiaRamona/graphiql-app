'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Props from './types';
import iconSrc from '../../app/icon.ico';
import Image from 'next/image';
import { FormControlLabel } from '@mui/material';
import MaterialUISwitch from '../SwitchTheme/MaterialUiSwitch';
import { useEffect, useState } from 'react';
import useHeaderNavigation from '@/hooks/useHeaderNavigation';
import useAuthStore from '@/store/store';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window, toggleTheme, isDarkMode } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState<string[]>([]);
  const { handleNavigation } = useHeaderNavigation();
  const { setAuthenticated } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setNavItems(['Sign out']);
      } else {
        setAuthenticated(false);
        setNavItems(['Sign in', 'Sign up']);
      }
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Graphiql App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => handleNavigation(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <header>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar sx={{ paddingRight: 0 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Link href="/welcome">
                <Image
                  src={iconSrc}
                  alt="icon"
                  width={50}
                  height={50}
                  style={{ marginRight: '10px' }}
                />
              </Link>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                QueryHub
              </Typography>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                {navItems.map((item) => (
                  <Button
                    key={item}
                    sx={{ color: '#fff' }}
                    onClick={() => handleNavigation(item)}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
              <FormControlLabel
                sx={{ marginRight: 0 }}
                control={
                  <MaterialUISwitch
                    sx={{ m: 1, marginLeft: 2 }}
                    checked={isDarkMode ?? false}
                    onChange={toggleTheme}
                  />
                }
                label=""
              />
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </header>
  );
}
