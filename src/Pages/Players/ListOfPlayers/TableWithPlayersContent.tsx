import { TableBody } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { IPlayer } from '../../../models/player.model';
import TableWithPlayersRow from './TableWithPlayersRow';

type IProps = {
  playersSortedByName: IPlayer[];
  handleBtnClick: (player: IPlayer) => void;
};

const TableWithPlayersContent = ({ playersSortedByName, handleBtnClick }: IProps): ReactElement => {
  const tableContent = (): ReactElement[] =>
    playersSortedByName.map((player, i) => <TableWithPlayersRow key={i} player={player} onChange={handleBtnClick} />);

  return <TableBody>{tableContent()}</TableBody>;
};

export default TableWithPlayersContent;
