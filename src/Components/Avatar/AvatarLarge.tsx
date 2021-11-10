import { Avatar, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

export const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
    },
    marginTop: theme.spacing(5),
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      transform: 'none',
    },
    transform: 'scale(1.5)',
    border: '2px solid #fff',
    backgroundColor: '#fff',
  },
}))

interface IProps {
  alt: string
  source: string
}

const AvatarLargeComponent: React.FC<IProps> = ({
  alt,
  source,
}: IProps): ReactElement => {
  const classes = useStyles()

  return (
    <Grid container justify="center" className={classes.container}>
      <Avatar alt={alt} src={source} className={classes.avatar} />
    </Grid>
  )
}

export default AvatarLargeComponent
