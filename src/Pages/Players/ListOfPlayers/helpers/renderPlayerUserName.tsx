import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import TableButton from '../../../../Components/Table/TableButton';
import { IPlayer } from '../../../../models/player.model';

const renderPlayerUserName = (player: IPlayer): ReactElement => {
  const history = useHistory();

  const gotoPredictions = (): void => history.push(`/spelers/${player.id}/voorspellingen/1/1`);

  return <TableButton color="primary" handleClick={gotoPredictions} caption={player.userName} />;
};

export default renderPlayerUserName;
