import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IPlayer } from '../../models/player.model';
import { updatePlayerAdminStatus } from '../../store/players/actions';
import TableCellsAdmin from './TableCellsAdmin';

export const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    height: 30,
    width: 30,
    objectFit: 'contain',
  },
  checkToto: {
    color: theme.palette.primary.main,
  },
  checkAdmin: {
    color: theme.palette.secondary.main,
  },
  link: {
    cursor: 'pointer',
  },
}));

type IProps = {
  player: IPlayer;
  onChange: (player: IPlayer) => void;
};

const RowWithPlayer: React.FC<IProps> = ({ player, onChange }: IProps): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [isAdmin, setIsAdmin] = useState<boolean>(player.admin);
  const [editModus, setEditModus] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsAdmin(!isAdmin);
    dispatch(updatePlayerAdminStatus(player.id, e.target.checked));
  };

  const gotoPredictions = (): void => history.push(`/spelers/${player.id}/voorspellingen/1/1`);
  const deletePlayer = (): void => onChange(player);

  const isAdminTableCell = (): ReactElement | null =>
    editModus ? (
      <Checkbox checked={isAdmin} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
    ) : player.admin ? (
      <Check className={classes.checkAdmin} />
    ) : null;

  return (
    <TableRow>
      <TableCell align="center">{isAdminTableCell()}</TableCell>
      <TableCell align="left" className={classes.link} onClick={gotoPredictions}>
        {player.userName}
      </TableCell>
      <TableCell align="left">
        <img className={classes.avatar} alt={player.team.name} src={player.team.logo} />
      </TableCell>
      <TableCell className={classes.checkToto} align="center">
        {player.totaalToto ? <Check /> : null}
      </TableCell>
      <TableCell align="left">{player.firstName}</TableCell>

      <TableCellsAdmin
        player={player}
        editModus={editModus}
        changeEditModus={() => setEditModus(!editModus)}
        deletePlayer={deletePlayer}
      />
    </TableRow>
  );
};

export default RowWithPlayer;
