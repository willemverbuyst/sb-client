import { TableCell } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IPlayer } from '../../models/player.model';
import { selectUser } from '../../store/user/selectors';
import RowButtons from './RowButtons';

type IProps = {
  player: IPlayer;
  editModus: boolean;
  changeEditModus: () => void;
  deletePlayer: () => void;
};

const TableCellsAdmin: React.FC<IProps> = ({
  player,
  editModus,
  changeEditModus,
  deletePlayer,
}: IProps): ReactElement | null => {
  const user = useSelector(selectUser);

  return user && user.admin ? (
    <>
      <TableCell align="left">{player.lastName}</TableCell>
      <TableCell align="left">{player.phoneNumber}</TableCell>
      <TableCell align="left">{player.email}</TableCell>
      <RowButtons editModus={editModus} changeEditModus={changeEditModus} deletePlayer={deletePlayer} />
    </>
  ) : null;
};

export default TableCellsAdmin;
