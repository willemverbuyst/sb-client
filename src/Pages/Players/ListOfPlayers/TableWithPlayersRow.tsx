import { Checkbox } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import TableButton from '../../../Components/Table/TableButton';
import TableCellsOneRow from '../../../Components/Table/TableCellsOneRow';
import TableEditCancelButtons from '../../../Components/Table/TableEditCancelButtons';
import { Align, CellValue } from '../../../Components/Table/types';
import { IPlayer } from '../../../models/player.model';
import { updatePlayerAdminStatus } from '../../../store/players/actions';
import { selectUser } from '../../../store/user/selectors';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 30,
    width: 30,
    objectFit: 'contain',
  },
  checkAdmin: {
    color: theme.palette.secondary.main,
  },
  checkToto: {
    color: theme.palette.primary.main,
  },
}));

type IProps = {
  player: IPlayer;
  onChange: (player: IPlayer) => void;
};

const TableWithPlayersRow: React.FC<IProps> = ({ player, onChange }: IProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);
  const [isAdmin, setIsAdmin] = useState<boolean>(player.admin);
  const [editModus, setEditModus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAdmin(!isAdmin);
    dispatch(updatePlayerAdminStatus(player.id, e.target.checked));
  };

  const gotoPredictions = (): void => history.push(`/spelers/${player.id}/voorspellingen/1/1`);
  const deletePlayer = (): void => onChange(player);

  const getIsAdmin = (): ReactElement | null =>
    editModus ? (
      <Checkbox checked={isAdmin} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
    ) : player.admin ? (
      <Check className={classes.checkAdmin} />
    ) : null;

  const getTotalToto = (): ReactElement | null => (player.totaalToto ? <Check className={classes.checkToto} /> : null);

  const getPlayerTeamLogo = (): ReactElement => (
    <img key={player.team.name} className={classes.avatar} alt={player.team.name} src={player.team.logo} />
  );

  const getPlayerUserName = (): ReactElement => (
    <TableButton color="primary" handleClick={gotoPredictions} caption={player.userName} />
  );

  const getEditCancelButtonsForAdmin = (): ReactElement => (
    <TableEditCancelButtons
      editModus={editModus}
      changeEditModus={() => setEditModus(!editModus)}
      handleDelete={deletePlayer}
    />
  );

  const playerTotalToto: JSX.Element | null = getTotalToto();
  const playerIsAdmin: JSX.Element | null = getIsAdmin();
  const playerTeamLogo: JSX.Element = getPlayerTeamLogo();
  const playerUserName: JSX.Element = getPlayerUserName();
  const editCancelButtonsForAdmin: JSX.Element = getEditCancelButtonsForAdmin();
  const playerFirstName: string = player.firstName;
  const playerLastName: string = player.lastName;
  const playerPhoneNumber: string = player.phoneNumber;
  const playerEmail: string = player.email;

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
