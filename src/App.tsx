import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import IceBlueGold from './ui/theme';
import Header from './Components/Header';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import Profiel from './Pages/Profiel';
import Regels from './Pages/Regels';
import Voorspellingen from './Pages/Voorspellingen';
import Toast from './Components/Toast'
import { Container } from '@material-ui/core';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    borderContainer: {
      borderRadius: '4px',
      padding: '4rem',
      minHeight: '80vh',
      marginTop: '2rem'
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Toast/>
      <Header/>
      <Container maxWidth="md" className={classes.borderContainer}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/profiel" component={Profiel} />
          <Route exact path="/regels" component={Regels} />
          <Route exact path="/voorspellingen" component={Voorspellingen} />
        </Switch>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
