import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../constants/setupGame';
import Pagination from '../Sections/Pagination';

interface IProps {
  totoronde: string;
  ronde: string;
}

const PaginationSection: React.FC<IProps> = ({ totoronde, ronde }: IProps): ReactElement => {
  const history = useHistory();

  const gotoTotoRound = (value: number, r: number) => history.push(`/voorspellingen/${value}/${r}`);

  const gotoRound = (value: number, t: number) => history.push(`/voorspellingen/${t}/${value}`);

  return (
    <Pagination
      totoRound={totoronde}
      round={ronde}
      countTotoRound={TOTO_ROUNDS}
      countRound={TOTAL_ROUNDS}
      gotoTotoRound={gotoTotoRound}
      gotoRound={gotoRound}
    />
  );
};

export default PaginationSection;
