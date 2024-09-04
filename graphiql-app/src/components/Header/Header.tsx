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
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MaterialUISwitch from '../SwitchTheme/MaterialUiSwitch';
import SwitchLanguage from '../SwitchLanguage/SwitchLanguage';
import Props from './types';
import iconSrc from '../../app/icon.ico';
import useHeaderNavigation from '@/hooks/useHeaderNavigation';
import useAuthStore from '@/store/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { FormControlLabel } from '@mui/material';
import useScrollPosition from '@/hooks/useScrollPosition';
import { darkTheme } from '@/theme/theme';

const drawerWidth = 240;

export default function Header(props: Props) {
  const { window, toggleTheme, isDarkMode } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navItems, setNavItems] = useState<string[]>([]);
  const { handleNavigation } = useHeaderNavigation();
  const { setAuthenticated } = useAuthStore();
  const locale = useTranslations();
  const params = useParams();
  const localeUrl = params.locale || 'en';
  const scrolled = useScrollPosition();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setNavItems([locale('signOut'), locale('home')]);
      } else {
        setAuthenticated(false);
        setNavItems([locale('signIn'), locale('signUp')]);
      }
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        QueryHub
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
        <AppBar
          component="nav"
          sx={{
            transition: 'all 0.3s ease',
            ...(scrolled && {
              height: '60px',
              backgroundColor: isDarkMode
                ? 'rgba(0, 0, 0, 0.8)'
                : 'rgba(16, 87, 169, 0.687)',
            }),
          }}
        >
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
              <Link href={`/${localeUrl}/welcome`}>
                <Image
                  src={iconSrc}
                  alt="icon"
                  width={scrolled ? 40 : 50}
                  height={scrolled ? 40 : 50}
                  style={{
                    marginRight: '10px',
                    transition: 'width 0.3s ease, height 0.3s ease',
                  }}
                  priority={true}
                />
              </Link>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'none', sm: 'block' },
                  fontSize: scrolled ? '1.25rem' : '1.5rem',
                  transition: 'font-size 0.3s ease',
                }}
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SwitchLanguage />
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
