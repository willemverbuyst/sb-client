import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Weekend } from '@material-ui/icons';
import BarChart from '@material-ui/icons/BarChart';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Face from '@material-ui/icons/Face';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import Group from '@material-ui/icons/Group';
import HelpOutline from '@material-ui/icons/HelpOutline';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ball from '../../../assets/ball.png';
import NavIcon from '../../../Components/NavIcon';
import * as HISTORY from '../../../history';
import { userLogOut } from '../../../store/user/action-creators';
import { selectRoundAndTotoRoundNumber } from '../../../store/user/selectors';
import { selectToken, selectUser } from '../../../store/user/selectors';
import { navIconsAdmin, navIconsRegular } from './nav-icons';

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
        marginTop: '1rem',
      },
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      marginBottom: '1rem',
    },
  }),
);

const Header: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  // const token = useSelector(selectToken);
  const token = true;
  const user = useSelector(selectUser);
  const [roundNumber, totoRoundNumber] = useSelector(selectRoundAndTotoRoundNumber);

  const gotoLogin = (): void => {
    dispatch(userLogOut());
    history.push('/login');
  };

  const icons = user && user.admin ? navIconsAdmin : navIconsRegular;

  return (
    <Grid container justify="center">
      {token ? (
        <Grid container className={classes.header} alignItems="center">
          {icons.map(({ label, goto, icon }, i) => (
            <NavIcon key={i} label={label} goto={goto} icon={icon} />
          ))}
          {/* <NavIcon label="program" goto={HISTORY.gotoProgram} icon={<Weekend className={classes.icon} />} />
          <NavIcon
            label="prediction"
            goto={() => HISTORY.gotoPredictionsUser(totoRoundNumber, roundNumber)}
            icon={<SportsSoccerIcon className={classes.icon} />}
          />
          <NavIcon label="my scores" goto={HISTORY.gotoScoresUser} icon={<BarChart className={classes.icon} />} />
          <NavIcon
            label="total toto"
            goto={HISTORY.gotoRankingTotalToto}
            icon={<EmojiEvents className={classes.icon} />}
          /> */}
          {/* <NavIcon
            label="toto round"
            goto={() => HISTORY.gotoRankingTotoRound(totoRoundNumber)}
            icon={<FormatListNumberedIcon className={classes.icon} />}
          /> */}
          {/* <NavIcon
            label="round"
            goto={() => HISTORY.gotoRankingRound(1)}
            icon={<FormatListNumberedRtlIcon className={classes.icon} />}
          />
          <NavIcon label="players" goto={HISTORY.gotoPlayers} icon={<Group className={classes.icon} />} />
          {user && user.admin ? (
            <NavIcon label="sign up" goto={HISTORY.gotoSignUp} icon={<PersonAdd className={classes.icon} />} />
          ) : null}
          <NavIcon label="profile" goto={HISTORY.gotoProfile} icon={<Face className={classes.icon} />} />
          <NavIcon label="rules" goto={HISTORY.gotoRules} icon={<HelpOutline className={classes.icon} />} /> */}
          <NavIcon label="sign out" goto={gotoLogin} icon={<ExitToAppIcon className={classes.icon} />} />
        </Grid>
      ) : (
        <Grid container className={classes.brand} alignItems="center">
          <img src={ball} style={{ width: '40px', margin: '0 10px 0 0' }} alt="soccer ball" />
          <Typography align="center" variant="h3">
            Sport Betting App
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Header;
