import { TableBody } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { IPlayer } from '../../../models/player.model';
import { sortArrayWithObjects } from '../../../utils/sortFunctions';
import RowWithPlayer from './RowWithPlayer';

type IProps = {
  players: IPlayer[];
  handleBtnClick: (player: IPlayer) => void;
};

const TableWithPlayersContent = ({ players, handleBtnClick }: IProps): ReactElement => {
  const sortTable = (playersToSort: IPlayer[]): IPlayer[] =>
    sortArrayWithObjects<keyof IPlayer, IPlayer>('userName')(playersToSort);

  const tableContent = (): ReactElement[] =>
    sortTable(players).map((player, i) => <RowWithPlayer key={i} player={player} onChange={handleBtnClick} />);

  return <TableBody>{tableContent()}</TableBody>;
};

export default TableWithPlayersContent;
