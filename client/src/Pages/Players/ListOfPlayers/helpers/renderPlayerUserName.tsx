import { Badge, Tooltip } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import TableButton from '../../../../Components/Button/TableButton'
import { IPlayer } from '../../../../models/player.model'

const renderPlayerUserName = (player: IPlayer): ReactElement => {
  const history = useHistory()

  const gotoPredictions = (): void =>
    history.push(`/spelers/${player.id}/voorspellingen/1/1`)

  return player.admin ? (
    <Tooltip title="admin">
      <Badge color="secondary" variant="dot">
        <TableButton
          color="primary"
          handleClick={gotoPredictions}
          caption={player.userName}
        />
      </Badge>
    </Tooltip>
  ) : (
    <TableButton
      color="primary"
      handleClick={gotoPredictions}
      caption={player.userName}
    />
  )
}

export { renderPlayerUserName }
