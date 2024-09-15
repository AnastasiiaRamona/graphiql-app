import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const YoutubeRSSchoolResource = () => {
  const locale = useTranslations();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={2}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Typography
        variant="h1"
        component="h2"
        sx={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 400,
          textAlign: 'center',
        }}
      >
        {locale('rssDescription')}
      </Typography>
      <iframe
        src="https://www.youtube.com/embed/M170z9Ok3CI?si=SmHS7oll1Be-QRIv"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  );
};

export default YoutubeRSSchoolResource;
