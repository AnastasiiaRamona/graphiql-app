import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import graphqlSrc from '../../assets/graphql.png';
import HistoryStorageProps from './types';
import { Link } from '@mui/material';
import formatDate from '@/utils/formatDate';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HistoryStorage({ requests }: HistoryStorageProps) {
  const params = useParams();
  const localeUrl = params?.locale || 'en';
  const reverseRequests = [...requests].reverse();
  const locale = useTranslations();

  return (
    <>
      <List
        sx={{ width: '100%', maxWidth: '95vw', bgcolor: 'background.paper' }}
      >
        {reverseRequests.map((request, index) => (
          <Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {request.method === 'graphql' ? (
                  <Avatar
                    alt="graphql"
                    src={graphqlSrc.src}
                    sx={{ height: '3.5rem', width: '3.5rem' }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      fontSize: '0.6rem',
                      fontWeight: '500',
                      height: '3rem',
                      width: '3rem',
                    }}
                  >
                    {request.method}
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                sx={{ ml: '1rem' }}
                primary={formatDate(request.dateTime)}
                secondary={
                  <Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'inline' }}
                    >
                      {locale('method')}:{' '}
                      <Typography component="span" sx={{ fontWeight: '500' }}>
                        {request.method}
                      </Typography>
                    </Typography>
                    <br />
                    <Link
                      href={`/${localeUrl}${request.link}  `}
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-block',
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {request.url}
                    </Link>
                  </Fragment>
                }
              />
            </ListItem>
            {index < reverseRequests.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </Fragment>
        ))}
      </List>
    </>
  );
}
