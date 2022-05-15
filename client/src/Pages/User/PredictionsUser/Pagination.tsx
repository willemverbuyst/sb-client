import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'

import PaginationComponent from '../../../Components/Pagination'
import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../../constants/setupGame'
import * as HISTORY from '../../../history'
import * as UTILS from '../../../utils'

interface IProps {
  round: number
  totoround: number
}

const Pagination: React.FC<IProps> = ({
  round,
  totoround,
}: IProps): ReactElement => {
  const handleChangeRounds = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    const totoRound = UTILS.totoRoundByRound(value)
    HISTORY.gotoPredictionsUser(totoRound, value)
  }

  const handleChangeTotoRounds = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => {
    const roundByTotoRound = UTILS.roundByTotoRound(value)
    HISTORY.gotoPredictionsUser(value, roundByTotoRound)
  }

  return (
    <Box my={2}>
      <PaginationComponent
        label="Totoronde"
        page={totoround}
        count={TOTO_ROUNDS}
        color="primary"
        onChange={handleChangeTotoRounds}
      />
      <PaginationComponent
        label="Speelronde"
        page={round}
        count={TOTAL_ROUNDS}
        color="secondary"
        onChange={handleChangeRounds}
      />
    </Box>
  )
}

export default Pagination
