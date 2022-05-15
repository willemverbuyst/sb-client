import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import AvatarLargeComponent from '../../Components/Avatar/AvatarLarge'
import { selectUser } from '../../store/user/selectors'
import * as UTILS from '../../utils'

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
    marginLeft: '1rem',
  },
  userName: {
    [theme.breakpoints.down('sm')]: {
      writingMode: 'horizontal-tb',
      justifyContent: 'center',
      fontSize: '2.5rem',
      marginTop: theme.spacing(2),
    },
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
    fontSize: '5rem',
    textTransform: 'uppercase',
    fontWeight: 500,
    color: '#fff',
  },
}))

const UserDisplay: React.FC = (): ReactElement => {
  const classes = useStyles()
  const user = useSelector(selectUser)

  const name = user ? UTILS.replaceUnderscore(user.userName) : 'Who are you?'

  return (
    <Grid container justify="center">
      <Grid container className={classes.wrapper}>
        <Grid container justify="center">
          <Typography className={classes.userName}>{name}</Typography>
        </Grid>
        {user ? (
          <AvatarLargeComponent alt={user.team.name} source={user.team.logo} />
        ) : null}
      </Grid>
    </Grid>
  )
}

export default UserDisplay
