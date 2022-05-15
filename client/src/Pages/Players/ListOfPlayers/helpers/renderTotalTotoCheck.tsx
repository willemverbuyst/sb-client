import { makeStyles, Theme } from '@material-ui/core/styles'
import Check from '@material-ui/icons/Check'
import React, { ReactElement } from 'react'

import { IPlayer } from '../../../../models/player.model'

const useStyles = makeStyles((theme: Theme) => ({
  checkToto: {
    color: theme.palette.primary.main,
  },
}))

const renderTotalTotoCheck = (player: IPlayer): ReactElement | null => {
  const classes = useStyles()

  return player.totaalToto ? <Check className={classes.checkToto} /> : null
}

export { renderTotalTotoCheck }
