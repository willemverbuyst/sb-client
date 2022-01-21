import './index.css'

import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { createTheme } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import App from './App'
import history from './history'
import reportWebVitals from './reportWebVitals'
import store from './store'

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          minHeigth: '100vh',
          backgroundColor: '#1e5eb1',
        },
      },
    },
  },
})

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
)

reportWebVitals()
