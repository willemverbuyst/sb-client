import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundColor: '#111',
        },
      },
    },
  },
});

ReactDOM.render(
    <Router>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
        </ThemeProvider>
      </Provider>
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
