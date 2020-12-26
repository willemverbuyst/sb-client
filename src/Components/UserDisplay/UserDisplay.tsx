import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  displayName: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
  },
  userName: {
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#fff',
  },
  team: {
    marginTop: theme.spacing(6),
  },
  avatar: {
    transform: 'scale(2)',
    border: '2px solid #fff',
    backgroundColor: '#fff',
  },
}));

const replaceUnderScore = (name: string): string => name.replace('_', ' ');

const UserDisplay: React.FC = (): ReactElement => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <Grid>
      {user ? (
        <Grid>
          <Grid container alignContent="center" className={classes.displayName}>
            <Typography variant="h1" className={classes.userName}>
              {replaceUnderScore(user.userName)}
            </Typography>
          </Grid>
          <Grid container justify="center" className={classes.team}>
            <Avatar alt={user.team.name} src={user.team.logo} className={classes.avatar} />
          </Grid>
        </Grid>
      ) : (
        <Grid container alignContent="center" className={classes.displayName}>
          <Typography variant="h1" className={classes.userName}>
            Who are you?
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default UserDisplay;
