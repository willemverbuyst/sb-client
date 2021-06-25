import React, { ReactElement } from 'react';

import * as HISTORY from '../../../history';
import Pagination from '../../Sections/Pagination';

interface IProps {
  totoronde: string;
  ronde: string;
}

const PaginationSection: React.FC<IProps> = ({ totoronde, ronde }: IProps): ReactElement => {
  const gotoTotoRound = (value: number, r: number) => HISTORY.gotoPredictionsUser(value, r);
  const gotoRound = (value: number, t: number) => HISTORY.gotoPredictionsUser(t, value);

  return <Pagination totoRound={totoronde} round={ronde} gotoTotoRound={gotoTotoRound} gotoRound={gotoRound} />;
};

export default PaginationSection;
