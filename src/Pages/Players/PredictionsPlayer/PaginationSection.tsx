import React, { ReactElement } from 'react';

import * as HISTORY from '../../../history';
import Pagination from '../../../Sections/Pagination';

interface IProps {
  totoronde: string;
  ronde: string;
  id: string;
}

const PaginationSection: React.FC<IProps> = ({ totoronde, ronde, id }: IProps): ReactElement => {
  return (
    <Pagination
      totoRound={totoronde}
      round={ronde}
      gotoTotoRound={(value, r) => HISTORY.gotoPredictionsPlayer(id, value, r)}
      gotoRound={(value, t) => HISTORY.gotoPredictionsPlayer(id, t, value)}
    />
  );
};

export default PaginationSection;
