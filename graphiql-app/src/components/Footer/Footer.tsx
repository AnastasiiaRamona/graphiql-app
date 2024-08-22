'use client';

import BottomNavigation from '@mui/material/BottomNavigation';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import rssLogo from '../../assets/RSS.svg';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from '@mui/material/Link';

const CustomBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(2),
}));

const Footer = () => {
  return (
    <CustomBottomNavigation>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="100%"
      >
        <IconButton
          href="https://github.com/AnastasiiaRamona/graphiql-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">2024</Typography>
          <IconButton
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={rssLogo} alt="RSS logo" width={30} height={30} />
          </IconButton>
        </Box>
      </Box>
    </CustomBottomNavigation>
  );
};

export default Footer;
