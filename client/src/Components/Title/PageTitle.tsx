import { Grid, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  topSection: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    justifyContent: 'space-between',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: '2.5rem',
    },
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
}))

interface IProps {
  title: string
  color: 'primary' | 'secondary'
}

const PageTitleComponent: React.FC<IProps> = ({
  title,
  color,
}: IProps): ReactElement => {
  const classes = useStyles()

  return (
    <Grid container className={classes.topSection}>
      <Typography variant="h3" color={color} className={classes.title}>
        {title}
      </Typography>
    </Grid>
  )
}

export default PageTitleComponent
