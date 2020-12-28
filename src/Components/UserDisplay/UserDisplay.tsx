import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    marginLeft: '1rem',
  },
  userName: {
    [theme.breakpoints.down('sm')]: {
      writingMode: 'horizontal-tb',
      justifyContent: 'center',
      fontSize: '2.5rem',
      marginTop: theme.spacing(1),
    },
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontSize: '5rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#fff',
  },
  team: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
    marginTop: theme.spacing(5),
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      transform: 'none',
    },
    transform: 'scale(1.5)',
    border: '2px solid #fff',
    backgroundColor: '#fff',
  },
}));

const replaceUnderScore = (name: string): string => name.replace('_', ' ');

const UserDisplay: React.FC = (): ReactElement => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <Grid container justify="center">
      {user ? (
        <Grid container className={classes.wrapper}>
          <Grid container justify="center">
            <Typography className={classes.userName}>{replaceUnderScore(user.userName)}</Typography>
          </Grid>
          <Grid container justify="center" className={classes.team}>
            <Avatar alt={user.team.name} src={user.team.logo} className={classes.avatar} />
          </Grid>
        </Grid>
      ) : (
        <Grid container className={classes.wrapper}>
          <Grid container justify="center">
            <Typography className={classes.userName}>Who are you?</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default UserDisplay;
