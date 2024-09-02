'use client';

import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from '@mui/material/Typography';
import rssLogo from '../../assets/RSS.svg';
import Box from '@mui/material/Box';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer>
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
          <Typography variant="body2" fontWeight={600}>
            2024
          </Typography>
          <IconButton
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={rssLogo}
              alt="RSS logo"
              width={30}
              height={30}
              priority={true}
            />
          </IconButton>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
