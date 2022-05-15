import { Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

import ball from '../../assets/ball.png'
import { APP_NAME } from '../../constants/general'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    brand: {
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
        marginTop: '1rem',
      },
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      marginBottom: '1rem',
    },
  })
)

const Brand: React.FC = (): ReactElement => {
  const classes = useStyles()

  return (
    <Grid container className={classes.brand} alignItems="center">
      <img
        src={ball}
        style={{ width: '40px', margin: '0 10px 0 0' }}
        alt="soccer ball"
      />
      <Typography align="center" variant="h4">
        {APP_NAME}
      </Typography>
    </Grid>
  )
}

export default Brand
