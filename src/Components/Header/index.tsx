import { Grid, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Weekend } from '@material-ui/icons';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Face from '@material-ui/icons/Face';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Group from '@material-ui/icons/Group';
import HelpOutline from '@material-ui/icons/HelpOutline';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ball from '../../assets/ball.png';
import { userLogOut } from '../../store/user/actions';
import { selectToken, selectUser } from '../../store/user/selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: '1.8rem',
      marginLeft: '0.5rem',
      marginRight: '0.5rem',
    },
    header: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        height: '100%',
      },
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      height: '3.6rem',
      marginBottom: '1rem',
    },
    brand: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        height: '3.5rem',
        marginTop: '1rem',
      },
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      height: '3.6rem',
      marginBottom: '1rem',
    },
    appName: {
      fontSize: '2rem',
    },
  }),
);

const Header: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  const gotoLogin = () => {
    dispatch(userLogOut());
    history.push('/login');
  };

  const gotoMyScores = () => history.push('/scores');

  const gotoPlayers = () => history.push('/spelers');

  const gotoPredictions = () => history.push('/voorspellingen/1/1');

  const gotoProfile = () => history.push('/profiel');

  const gotoProgram = () => history.push('/programma');

  const gotoRules = () => history.push('/regels');

  const gotoSignUp = () => history.push('/admin/signup');

  const gotoTotalToto = () => history.push('/klassement/totaaltoto');

  return (
    <Grid container justify="center">
      {token ? (
        <Grid container className={classes.header} alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoProgram}>
            <Weekend className={classes.icon} />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoPredictions}>
            <SportsSoccerIcon className={classes.icon} />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoMyScores}>
            <EmojiEvents className={classes.icon} />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoPlayers}>
            <Group className={classes.icon} />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoTotalToto}>
            <FormatListNumberedIcon className={classes.icon} />
          </IconButton>

          {user && user.admin ? (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoSignUp}>
              <PersonAdd className={classes.icon} />
            </IconButton>
          ) : (
            ''
          )}

          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoProfile}>
            <Face className={classes.icon} />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoRules}>
            <HelpOutline className={classes.icon} />
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="log out" onClick={gotoLogin}>
            <ExitToAppIcon className={classes.icon} />
          </IconButton>
        </Grid>
      ) : (
        <Grid container className={classes.brand} alignItems="center">
          <img src={ball} style={{ width: '40px', margin: '0 10px 0 0' }} alt="soccer ball" />
          <Typography className={classes.appName}>Sport Betting App</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Header;
