import { Box } from '@material-ui/core'
import React, { ReactElement } from 'react'

import PaginationComponent from '../../../Components/Pagination'
import { TOTO_ROUNDS } from '../../../constants/setupGame'
import * as HISTORY from '../../../history'

interface IProps {
  totoRound: number
}

const PaginationSection: React.FC<IProps> = ({
  totoRound,
}: IProps): ReactElement => {
  const gotoTotoRound = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ): void => HISTORY.gotoRankingTotoRound(value)

  return (
    <Box my={2}>
      <PaginationComponent
        label="Totoronde"
        page={totoRound}
        count={TOTO_ROUNDS}
        color="standard"
        onChange={gotoTotoRound}
      />
    </Box>
  )
}

export default PaginationSection
