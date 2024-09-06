import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Member, TeamCardProps } from './types';

const MultiActionAreaCard = ({
  name,
  img,
  email,
  location,
  description,
  github,
}: Member) => {
  return (
    <Card
      sx={{
        display: 'flex',
        width: '60%',
        margin: '20px 0',
        '@media (max-width: 975px)': {
          width: '80%',
        },
        '@media (max-width: 635px)': {
          width: '100%',
        },
      }}
    >
      <CardActionArea
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
      >
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2">{description}</Typography>
          <Typography variant="body2">{location}</Typography>
          <Typography variant="body2">
            <a
              href={`mailto:${email}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {email}
            </a>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'inherit',
              }}
            >
              <GitHubIcon sx={{ mr: 1 }} />
              GitHub
            </a>
          </Box>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            width: 150,
            '@media (max-width: 388px)': {
              width: 100,
            },
          }}
          src={img.src}
          alt={name}
        />
      </CardActionArea>
    </Card>
  );
};

const TeamCard = ({ members }: TeamCardProps) => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '90vw',
        padding: 0,
      }}
    >
      {members.map((member: Member, index: number) => (
        <MultiActionAreaCard
          key={index}
          name={member.name}
          img={member.img}
          email={member.email}
          location={member.location}
          description={member.description}
          github={member.github}
        />
      ))}
    </Container>
  );
};

export default TeamCard;
