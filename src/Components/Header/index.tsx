import { Grid, Typography } from '@material-ui/core';
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
import NavIcon from './NavIcon';

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
          <NavIcon label="program" goto={gotoProgram} icon={<Weekend className={classes.icon} />} />
          <NavIcon label="prediction" goto={gotoPredictions} icon={<SportsSoccerIcon className={classes.icon} />} />
          <NavIcon label="my scores" goto={gotoMyScores} icon={<EmojiEvents className={classes.icon} />} />
          <NavIcon label="players" goto={gotoPlayers} icon={<Group className={classes.icon} />} />
          <NavIcon label="total toto" goto={gotoTotalToto} icon={<FormatListNumberedIcon className={classes.icon} />} />
          {user && user.admin ? (
            <NavIcon label="sign up" goto={gotoSignUp} icon={<PersonAdd className={classes.icon} />} />
          ) : null}
          <NavIcon label="profile" goto={gotoProfile} icon={<Face className={classes.icon} />} />
          <NavIcon label="rules" goto={gotoRules} icon={<HelpOutline className={classes.icon} />} />
          <NavIcon label="sign out" goto={gotoLogin} icon={<ExitToAppIcon className={classes.icon} />} />
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
