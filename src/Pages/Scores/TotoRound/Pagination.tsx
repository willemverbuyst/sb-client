import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PaginationComponent from '../../../Components/Pagination';
import { TOTO_ROUNDS } from '../../../constants/setupGame';
import * as HISTORY from '../../../history';

interface IProps {
  totoRound: string;
}

const PaginationSection: React.FC<IProps> = ({ totoRound }: IProps): ReactElement => {
  const t = Number(totoRound);
  const gotoTotoRound = (_event: React.ChangeEvent<unknown>, value: number): void =>
    HISTORY.gotoRankingTotoRound(value);

  return (
    <Box my={2}>
      <PaginationComponent label="Totoronde" page={t} count={TOTO_ROUNDS} color="primary" onChange={gotoTotoRound} />
    </Box>
  );
};

export default PaginationSection;
