import { Box, Grid } from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  MuiThemeProvider,
  Theme,
} from '@material-ui/core/styles'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AppRouter from './AppRouter'
import Toast from './Components/Communication/Toast'
import Header from './Sections/Header'
import UserDisplay from './Sections/UserDisplay'
import { getUserWithStoredToken } from './store/user/action-creators'
import IceBlueGold from './theme'

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
        minHeight: '60vh',
      },
    },
  })
)

const App: React.FC = (): ReactElement => {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserWithStoredToken())
  }, [])

  return (
    <MuiThemeProvider theme={IceBlueGold}>
      <Grid container className={classes.mainWrapper}>
        <Toast />
        <Header />
        <Grid container>
          <Grid item md={11} xs={12}>
            <Box className={classes.content}>
              <AppRouter />
            </Box>
          </Grid>
          <Grid item md={1} xs={12}>
            <UserDisplay />
          </Grid>
        </Grid>
      </Grid>
    </MuiThemeProvider>
  )
}

export default App
