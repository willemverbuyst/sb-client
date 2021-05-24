import { TableCell } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { IPlayer } from '../../models/player.model';
import { selectUser } from '../../store/user/selectors';
import TableButton from './TableButton';

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
      {editModus ? (
        <>
          <TableButton caption="DELETE" color="secondary" handleClick={deletePlayer} />
          <TableButton caption="CANCEL" color="primary" handleClick={changeEditModus} />
        </>
      ) : (
        <TableButton caption="EDIT" color="primary" handleClick={changeEditModus} />
      )}
    </>
  ) : null;
};

export default TableCellsAdmin;
