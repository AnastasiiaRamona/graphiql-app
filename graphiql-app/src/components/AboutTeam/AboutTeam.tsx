import { Box, Typography } from '@mui/material';
import Groups3SharpIcon from '@mui/icons-material/Groups3Sharp';
import TeamCard from './TeamCard/TeamCard';
import { useTranslations } from 'next-intl';
import anastasiiaImgSrc from '../../assets/images/Anastasiia.webp';
import martiImgSrc from '../../assets/images/Marti.webp';
import aleksImgSrc from '../../assets/images/Aleks.webp';
import { Member } from './TeamCard/types';

const AboutTeamBox = () => {
  const locale = useTranslations();
  const members: Member[] = [
    {
      name: locale('nameAnastasiia'),
      img: anastasiiaImgSrc,
      email: 'anastasiarchm@gmail.com',
      location: locale('locationAnastasiia'),
      description: locale('frontendDescription'),
      github: 'https://github.com/AnastasiiaRamona/',
    },
    {
      name: locale('nameAleks'),
      img: aleksImgSrc,
      email: 'aleks6699@gmail.com',
      location: locale('locationAleks'),
      description: locale('frontendDescription'),
      github: 'https://github.com/aleks6699/',
    },
    {
      name: locale('nameMarti'),
      img: martiImgSrc,
      email: 'marti.iden.cod@gmail.com',
      location: locale('locationMarti'),
      description: locale('frontendDescription'),
      github: 'https://github.com/MartiP54/',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        marginBottom: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 500,
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          {locale('aboutTeam')}
        </Typography>
        <Groups3SharpIcon sx={{ fontSize: 50, mb: 2 }} />
      </Box>

      <TeamCard members={members} />
    </Box>
  );
};

export default AboutTeamBox;
