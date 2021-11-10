import { makeStyles } from '@material-ui/core/styles'
import React, { ReactElement } from 'react'

import { IPlayer } from '../../../../models/player.model'

const useStyles = makeStyles(() => ({
  avatar: {
    height: 30,
    width: 30,
    objectFit: 'contain',
  },
}))

const renderPlayerTeamLogo = (player: IPlayer): ReactElement => {
  const classes = useStyles()

  return (
    <img
      key={player.team.name}
      className={classes.avatar}
      alt={player.team.name}
      src={player.team.logo}
    />
  )
}

export { renderPlayerTeamLogo }
