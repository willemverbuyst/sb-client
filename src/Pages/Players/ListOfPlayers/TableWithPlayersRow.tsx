import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableCellsOneRow from '../../../Components/Table/TableCellsOneRow';
import { Align, CellValue } from '../../../Components/Table/types';
import { IPlayer } from '../../../models/player.model';
import { updatePlayerAdminStatus } from '../../../store/players/actions';
import { selectUser } from '../../../store/user/selectors';
import renderButtonsForAdmin from './helpers/renderButtonsForAdmin';
import renderIsAdminCheck from './helpers/renderIsAdminCheck';
import renderPlayerTeamLogo from './helpers/renderPlayerTeamLogo';
import renderPlayerUserName from './helpers/renderPlayerUserName';
import renderTotalTotoCheck from './helpers/renderTotalTotoCheck';

type IProps = {
  player: IPlayer;
  onChange: (player: IPlayer) => void;
};

const TableWithPlayersRow: React.FC<IProps> = ({ player, onChange }: IProps): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isAdmin, setIsAdmin] = useState<boolean>(player.admin);
  const [editModus, setEditModus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAdmin(!isAdmin);
    dispatch(updatePlayerAdminStatus(player.id, e.target.checked));
  };
  const toggleEditModus = () => setEditModus(!editModus);
  const deletePlayer = (): void => onChange(player);

  const playerIsAdmin: JSX.Element | null = renderIsAdminCheck(editModus, isAdmin, handleChange, player);
  const playerUserName: JSX.Element = renderPlayerUserName(player);
  const playerTeamLogo: JSX.Element = renderPlayerTeamLogo(player);
  const playerTotalToto: JSX.Element | null = renderTotalTotoCheck(player);
  const playerFirstName: string = player.firstName;

  const playerLastName: string = player.lastName;
  const playerPhoneNumber: string = player.phoneNumber;
  const playerEmail: string = player.email;
  const editCancelButtonsForAdmin: JSX.Element = renderButtonsForAdmin(editModus, toggleEditModus, deletePlayer);

  const cellsRegularUser: [CellValue, Align][] = [
    [playerIsAdmin, 'center'],
    [playerUserName, 'left'],
    [playerTeamLogo, 'left'],
    [playerTotalToto, 'center'],
    [playerFirstName, 'left'],
  ];

  const cellsAdmin: [CellValue, Align][] = [
    ...cellsRegularUser,
    [playerLastName, 'left'],
    [playerPhoneNumber, 'left'],
    [playerEmail, 'left'],
    [editCancelButtonsForAdmin, 'center'],
  ];

  return <TableCellsOneRow cells={user && user.admin ? cellsAdmin : cellsRegularUser} />;
};

export default TableWithPlayersRow;
