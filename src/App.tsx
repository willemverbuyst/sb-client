import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getUserWithStoredToken } from './store/user/actions';
import IceBlueGold from './ui/theme';
import Header from './Components/Header';
import Toast from './Components/Toast';
import UserDisplay from './Components/UserDisplay/UserDisplay';
import SignUp from './Pages/Admin/SignUp';
import Spelers from './Pages/Spelers/Spelers';
import SpelersProfiel from './Pages/Spelers/SpelersProfiel';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import PageNotFound from './Pages/PageNotFound';
import Profiel from './Pages/Profiel';
import Regels from './Pages/Regels';
import Games from './Pages/Scores/Games';
import Fixture from './Pages/Scores/Fixture';
import TotoRound from './Pages/Scores/TotoRound';
import Voorspellingen from './Pages/Voorspellingen';
import { 
  createStyles, 
  makeStyles, 
  MuiThemeProvider, 
  Theme 
} from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentWrapper: {
      marginTop: theme.spacing(2)
    },
    content: {
      borderRadius: '4px',
      padding: '1rem 2rem',
      minHeight: '85vh',
      backgroundColor: '#f1f1f1',
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    user: {
      marginRight: theme.spacing(5),
    },
    spinnerContainer: {
      minHeight: '85vh',
      postion: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }

  })
);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken);
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Toast/>
      <Header/> 
      <Grid
        container
        className={classes.contentWrapper}
        >
        <Grid item md={11} xs={12}>
          <Box className={classes.content}>
            <Switch>
              <Redirect exact path="/" to="/login" />
              <Route exact path="/admin/signup" component={SignUp} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/page-not-found" component={PageNotFound} />
              <Route exact path="/profiel" component={Profiel} />
              <Route exact path="/regels" component={Regels} />
              <Route exact path="/scores/games" component={Games} />
              <Route exact path="/scores/wedstrijd/:id" component={Fixture} />
              <Route exact path="/scores/totoronde/:id" component={TotoRound} />
              <Route exact path="/spelers" component={Spelers} />
              <Route exact path="/spelers/:id" component={SpelersProfiel} />
              <Route exact path="/voorspellingen" component={Voorspellingen} />
              <Redirect path="/" to="/page-not-found" />
            </Switch>
          </Box>
        </Grid>
        <Grid item md={1} xs={12}>
          <Box className={classes.user}>
            <UserDisplay/>
          </Box>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
