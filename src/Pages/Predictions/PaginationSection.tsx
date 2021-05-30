import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../constants/setupGame';
import { roundByTotoRound, totoRoundByRound } from '../../utils/parameterFunctions';
import Pagination from '../Sections/Pagination';

interface IProps {
  totoronde: string;
  ronde: string;
}

const PaginationSection: React.FC<IProps> = ({ totoronde, ronde }: IProps): ReactElement => {
  const history = useHistory();

  let t = Number(totoronde);
  let r = Number(ronde);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    r = roundByTotoRound(value);
    history.push(`/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    t = totoRoundByRound(value);

    history.push(`/voorspellingen/${t}/${value}`);
  };

  return (
    <Pagination
      totoRound={totoronde}
      round={ronde}
      countTotoRound={TOTO_ROUNDS}
      countRound={TOTAL_ROUNDS}
      handleChangeRounds={handleChangeRounds}
      handleChangeTotoRounds={handleChangeTotoRounds}
    />
  );
};

export default PaginationSection;
