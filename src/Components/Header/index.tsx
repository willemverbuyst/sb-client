import { Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
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
            <Tooltip title="Programma" arrow>
              <Weekend className={classes.icon} />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoPredictions}>
            <Tooltip title="Voorspellingen" arrow>
              <SportsSoccerIcon className={classes.icon} />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoMyScores}>
            <Tooltip title="Scores" arrow>
              <EmojiEvents className={classes.icon} />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoPlayers}>
            <Tooltip title="Spelers" arrow>
              <Group className={classes.icon} />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoTotalToto}>
            <Tooltip title="Klassement" arrow>
              <FormatListNumberedIcon className={classes.icon} />
            </Tooltip>
          </IconButton>

          {user && user.admin ? (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={gotoSignUp}>
              <Tooltip title="Sign up" arrow>
                <PersonAdd className={classes.icon} />
              </Tooltip>
            </IconButton>
          ) : (
            ''
          )}

          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoProfile}>
            <Tooltip title="Profiel" arrow>
              <Face className={classes.icon} />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="account circle" onClick={gotoRules}>
            <Tooltip title="Regels" arrow>
              <HelpOutline className={classes.icon} />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="log out" onClick={gotoLogin}>
            <Tooltip title="Log Out" arrow>
              <ExitToAppIcon className={classes.icon} />
            </Tooltip>
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
