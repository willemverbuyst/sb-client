import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {MuiThemeProvider} from '@material-ui/core/styles';
import IceBlueGold from './ui/theme';
import Header from './Components/Header';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import Profiel from './Pages/Profiel';
import Regels from './Pages/Regels';
import Voorspellingen from './Pages/Voorspellingen';
import Toast from './Components/Toast'

function App() {
  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Toast/>
      <Header/>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/profiel" component={Profiel} />
        <Route exact path="/regels" component={Regels} />
        <Route exact path="/voorspellingen" component={Voorspellingen} />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
