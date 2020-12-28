import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getUserWithStoredToken } from './store/user/actions';
import IceBlueGold from './ui/theme';
import Header from './Components/Header';
import Toast from './Components/Toast';
import UserDisplay from './Components/UserDisplay/UserDisplay';
import Fixture from './Pages/Scores/Fixture';
import ListOfPlayers from './Pages/Players/ListOfPlayers';
import LogIn from './Pages/LogIn';
import PageNotFound from './Pages/PageNotFound';
import Predictions from './Pages/Predictions';
import PredictionsPlayer from './Pages/Players/PredictionsPlayer';
import Profile from './Pages/Profile';
import Program from './Pages/Program';
import Rules from './Pages/Rules';
import Round from './Pages/Scores/Round';
import ScoresPlayer from './Pages/Players/ScoresPlayer';
import ScoresUser from './Pages/Scores/ScoresUser';
import SignUp from './Pages/Admin/SignUp';
import TotalToto from './Pages/Scores/TotalToto';
import TotoRound from './Pages/Scores/TotoRound';
import { createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainWrapper: {
      padding: '1rem',
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
    },
    content: {
      borderRadius: '4px',
      padding: '1rem 2rem',
      minHeight: 'calc(100vh - 6.6rem)',
      backgroundColor: '#f1f1f1',
      [theme.breakpoints.down('sm')]: {
        borderRadius: '0px',
        padding: '1rem 1rem',
        minHeight: '100%',
      },
    },
  }),
);

const App: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Grid container className={classes.mainWrapper}>
        <Toast />
        <Header />
        <Grid container>
          <Grid item md={11} xs={12}>
            <Box className={classes.content}>
              <Switch>
                <Redirect exact path="/" to="/login" />
                <Route exact path="/admin/signup" component={SignUp} />
                <Route exact path="/klassement/ronde/:id" component={Round} />
                <Route exact path="/klassement/totaaltoto" component={TotalToto} />
                <Route exact path="/klassement/totoronde/:id" component={TotoRound} />
                <Route exact path="/login" component={LogIn} />
                <Route exact path="/page-not-found" component={PageNotFound} />
                <Route exact path="/profiel" component={Profile} />
                <Route exact path="/programma" component={Program} />
                <Route exact path="/regels" component={Rules} />
                <Route exact path="/scores" component={ScoresUser} />
                <Route exact path="/spelers" component={ListOfPlayers} />
                <Route exact path="/spelers/:id/scores" component={ScoresPlayer} />
                <Route exact path="/spelers/:id/voorspellingen/:totoronde/:ronde" component={PredictionsPlayer} />
                <Route exact path="/voorspellingen/:totoronde/:ronde" component={Predictions} />
                <Route exact path="/wedstrijd/:id" component={Fixture} />
                <Redirect path="/" to="/page-not-found" />
              </Switch>
            </Box>
          </Grid>
          <Grid item md={1} xs={12}>
            <UserDisplay />
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
};

export default App;
