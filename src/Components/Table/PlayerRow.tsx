import { Checkbox, TableCell, TableRow } from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { IPlayer } from '../../models/player.model';
import { updatePlayerAdminStatus } from '../../store/players/actions';
import { ColorButton, useStyles } from './PlayerRowStyles';

type Props = {
  key: number;
  player: IPlayer;
  userIsAdmin: boolean;
  updateStatus: boolean;
  onChange: (player: IPlayer) => void;
};

const PlayerRow: React.FC<Props> = (props: Props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState<boolean>(props.player.admin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(!isAdmin);
    dispatch(updatePlayerAdminStatus(props.player.id, e.target.checked));
  };

  const gotoPredictions = () => history.push(`/spelers/${props.player.id}/voorspellingen/1/1`);

  return (
    <TableRow>
      {props.updateStatus ? (
        <TableCell>
          <Checkbox checked={isAdmin} onChange={handleChange} inputProps={{ 'aria-label': 'primary checkbox' }} />
        </TableCell>
      ) : (
        <TableCell className={classes.checkAdmin} align="center">
          {props.player.admin ? <Check /> : null}
        </TableCell>
      )}

      <TableCell align="left" className={classes.link} onClick={gotoPredictions}>
        {props.player.userName}
      </TableCell>

      <TableCell align="left">
        <img className={classes.avatar} alt={props.player.team.name} src={props.player.team.logo} />
      </TableCell>

      <TableCell align="left">{props.player.firstName}</TableCell>

      {props.userIsAdmin ? <TableCell align="left">{props.player.lastName}</TableCell> : null}

      <TableCell className={classes.checkToto} align="center">
        {props.player.totaalToto ? <Check /> : null}
      </TableCell>

      {props.userIsAdmin ? <TableCell align="left">{props.player.phoneNumber}</TableCell> : null}

      {props.userIsAdmin ? <TableCell align="left">{props.player.email}</TableCell> : null}

      {props.userIsAdmin && props.updateStatus ? (
        <TableCell align="left">
          <ColorButton size="small" onClick={() => props.onChange(props.player)}>
            DELETE
          </ColorButton>
        </TableCell>
      ) : null}
    </TableRow>
  );
};

export default PlayerRow;
