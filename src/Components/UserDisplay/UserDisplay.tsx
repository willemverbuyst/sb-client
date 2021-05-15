import { Avatar, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/selectors';
import { replaceUnderscore } from '../../utils/formatFunctions';
import { useStyles } from './UserDisplayStyles';

const UserDisplay: React.FC = (): ReactElement => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <Grid container justify="center">
      {user ? (
        <Grid container className={classes.wrapper}>
          <Grid container justify="center">
            <Typography className={classes.userName}>{replaceUnderscore(user.userName)}</Typography>
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
