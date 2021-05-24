import { TableBody } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IPlayer } from '../../models/player.model';
import { selectUser } from '../../store/user/selectors';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import RowWithPlayer from './RowWithPlayer';

type IProps = {
  players: IPlayer[];
  handleBtnClick: (player: IPlayer) => void;
};

const TableContent: React.FC<IProps> = ({ players, handleBtnClick }: IProps): ReactElement => {
  const user = useSelector(selectUser);

  const sortTable = (players: IPlayer[]): IPlayer[] =>
    sortArrayWithObjects<keyof IPlayer, IPlayer>('userName')(players);

  const tableContent = (): ReactElement[] =>
    sortTable(players).map((player, i) => (
      <RowWithPlayer key={i} player={player} userIsAdmin={user ? user.admin : false} onChange={handleBtnClick} />
    ));

  return <TableBody>{tableContent()}</TableBody>;
};

export default TableContent;
