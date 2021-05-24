import { Avatar, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/selectors';
import { replaceUnderscore } from '../../utils/formatFunctions';
import { useStyles } from './UserDisplayStyles';

const UserDisplay: React.FC = (): ReactElement => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  const name = user ? replaceUnderscore(user.userName) : 'Who are you?';
  const logo = user ? <Avatar alt={user.team.name} src={user.team.logo} className={classes.avatar} /> : null;

  return (
    <Grid container justify="center">
      <Grid container className={classes.wrapper}>
        <Grid container justify="center">
          <Typography className={classes.userName}>{name}</Typography>
        </Grid>
        <Grid container justify="center" className={classes.team}>
          {logo}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDisplay;
