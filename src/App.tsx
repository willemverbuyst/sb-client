import React from 'react';
import {MuiThemeProvider} from '@material-ui/core/styles'
import IceBlueGold from './ui/theme';
import Header from './Components/Header'
import LogIn from './Pages/LogIn'


function App() {
  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Header/>
      <LogIn/>
      </MuiThemeProvider>
  );
}

export default App;
