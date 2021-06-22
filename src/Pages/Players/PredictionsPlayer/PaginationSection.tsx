import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import Pagination from '../../Sections/Pagination';

interface IProps {
  totoronde: string;
  ronde: string;
  id: string;
}

const PaginationSection: React.FC<IProps> = ({ totoronde, ronde, id }: IProps): ReactElement => {
  const history = useHistory();

  const gotoTotoRound = (value: number, r: number) => history.push(`/spelers/${id}/voorspellingen/${value}/${r}`);

  const gotoRound = (value: number, t: number) => history.push(`/spelers/${id}/voorspellingen/${t}/${value}`);

  return <Pagination totoRound={totoronde} round={ronde} gotoTotoRound={gotoTotoRound} gotoRound={gotoRound} />;
};

export default PaginationSection;
