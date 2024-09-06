import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Brightness4TwoToneIcon from '@mui/icons-material/Brightness4TwoTone';
import DeviceHubTwoToneIcon from '@mui/icons-material/DeviceHubTwoTone';
import LanTwoToneIcon from '@mui/icons-material/LanTwoTone';
import ManageHistoryTwoToneIcon from '@mui/icons-material/ManageHistoryTwoTone';
import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import { useTranslations } from 'next-intl';

export default function ApplicationTools() {
  const locale = useTranslations();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
        '& > :not(style)': {
          m: 1,
          width: '28vh',
          height: '28vh',
        },
      }}
    >
      <Block
        text={locale('applicationToolsBlock1')}
        Icon={Brightness4TwoToneIcon}
      />
      <Block
        text={locale('applicationToolsBlock2')}
        Icon={DeviceHubTwoToneIcon}
      />
      <Block text={locale('applicationToolsBlock3')} Icon={LanTwoToneIcon} />
      <Block
        text={locale('applicationToolsBlock4')}
        Icon={ManageHistoryTwoToneIcon}
      />
      <Block text={locale('applicationToolsBlock5')} Icon={PublicTwoToneIcon} />
    </Box>
  );
}

const Block: React.FC<{
  text: string;
  Icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string;
  };
}> = (props) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1rem',
        justifyContent: 'center',
        gap: '0.5rem',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <props.Icon
        sx={{
          fontSize: 50,
          transition: 'color 0.3s ease',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      />
      <Typography variant="h5" sx={{ textAlign: 'center', fontSize: '1rem' }}>
        {props.text}
      </Typography>
    </Paper>
  );
};
