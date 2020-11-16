import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { selectAppLoading } from './store/appState/selectors';
import { getUserWithStoredToken } from './store/user/actions';
import IceBlueGold from './ui/theme';
import Header from './Components/Header';
import Progress from './Components/Progress';
import Toast from './Components/Toast';
import UserDisplay from './Components/UserDisplay/UserDisplay';
import SignUp from './Pages/Admin/SignUp';
import Spelers from './Pages/Admin/Spelers';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import PageNotFound from './Pages/PageNotFound';
import Profiel from './Pages/Profiel';
import Regels from './Pages/Regels';
import Scores from './Pages/Scores';
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
  const isLoading = useSelector(selectAppLoading)

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Toast/>
      <Header/> 
      <Grid
        container
        className={classes.contentWrapper}
        >
        {isLoading ?  (
        <Grid item md={11} xs={12} className={classes.spinnerContainer}>
          <Progress/>
        </Grid> 
        ) : (
        <Grid item md={11} xs={12}>
          <Box className={classes.content}>
            <Switch>
              <Redirect exact path="/" to="/login" />
              <Route exact path="/admin/signup" component={SignUp} />
              <Route exact path="/admin/spelers" component={Spelers} />
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/page-not-found" component={PageNotFound} />
              <Route exact path="/profiel" component={Profiel} />
              <Route exact path="/regels" component={Regels} />
              <Route exact path="/scores" component={Scores} />
              <Route exact path="/voorspellingen" component={Voorspellingen} />
              <Redirect path="/" to="/page-not-found" />
            </Switch>
          </Box>
        </Grid>
        )}
        <Grid item md={1} xs={12}>
          <UserDisplay/>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
