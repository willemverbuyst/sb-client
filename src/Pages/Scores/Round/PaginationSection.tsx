import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PaginationComponent from '../../../Components/Pagination';
import { TOTAL_ROUNDS } from '../../../constants/setupGame';
import * as HISTORY from '../../../history';

interface IProps {
  round: string;
}

const PaginationSection: React.FC<IProps> = ({ round }: IProps): ReactElement => {
  const t = Number(round);
  const gotoRound = (_event: React.ChangeEvent<unknown>, value: number): void => HISTORY.gotoRankingRound(value);

  return (
    <Box my={2}>
      <PaginationComponent label="Speelronde" page={t} count={TOTAL_ROUNDS} color="secondary" onChange={gotoRound} />
    </Box>
  );
};

export default PaginationSection;
