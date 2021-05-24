import { Button, Checkbox, TableCell, TableRow } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IPlayer } from '../../models/player.model';
import { updatePlayerAdminStatus } from '../../store/players/actions';
import { RedButton, useStyles } from './PlayerRowStyles';

type IProps = {
  player: IPlayer;
  userIsAdmin: boolean;
  onChange: (player: IPlayer) => void;
};

const PlayerRow: React.FC<IProps> = ({ player, userIsAdmin, onChange }: IProps): ReactElement => {
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

  return (
    <TableRow>
      <TableCell align="center">
        {editModus ? (
          <Checkbox checked={isAdmin} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
        ) : player.admin ? (
          <Check className={classes.checkAdmin} />
        ) : null}
      </TableCell>

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

      {userIsAdmin ? (
        <>
          <TableCell align="left">{player.lastName}</TableCell>
          <TableCell align="left">{player.phoneNumber}</TableCell>
          <TableCell align="left">{player.email}</TableCell>
          {editModus ? (
            <>
              <TableCell align="left">
                <RedButton size="small" onClick={deletePlayer}>
                  DELETE
                </RedButton>
              </TableCell>
              <TableCell align="left">
                <Button size="small" variant="contained" color="primary" onClick={() => setEditModus(false)}>
                  CANCEL
                </Button>
              </TableCell>
            </>
          ) : (
            <TableCell align="left">
              <Button size="small" variant="outlined" color="primary" onClick={() => setEditModus(true)}>
                Edit
              </Button>
            </TableCell>
          )}
        </>
      ) : null}
    </TableRow>
  );
};

export default PlayerRow;
