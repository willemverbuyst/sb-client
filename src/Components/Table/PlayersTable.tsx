import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { IPlayer } from '../../models/player.model';
import PlayerRow from './PlayerRow';
import DeleteDialog from '../Toast/DeleteDialog';

const sortTable = (arr: IPlayer[]): IPlayer[] =>
  [...arr].sort((player1, player2) => player1.userName.toLowerCase().localeCompare(player2.userName.toLowerCase()));

type Prop = {
  players: IPlayer[];
  changeStatus: boolean;
};

export default function PlayersTable({ players, changeStatus }: Prop) {
  const user = useSelector(selectUser);
  const [showDialog, setShowDialog] = useState(false);
  const [player, setPlayer] = useState<IPlayer | null>(null);

  const handleChange = () => {
    setShowDialog(!showDialog);
  };

  const handleBtnClick = (player: IPlayer) => {
    setPlayer(player);
    setShowDialog(!showDialog);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">admin</TableCell>
              <TableCell align="left">user name</TableCell>
              <TableCell align="left">team</TableCell>
              <TableCell align="left">naam</TableCell>
              {user && user.admin ? <TableCell align="left">achternaam</TableCell> : null}
              <TableCell align="center">totaal-toto</TableCell>
              {user && user.admin ? <TableCell align="left">telefoon</TableCell> : null}
              {user && user.admin ? <TableCell align="left">email</TableCell> : null}
              {user && user.admin && changeStatus ? <TableCell align="left"></TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {user &&
              sortTable(players).map((player, i) => (
                <PlayerRow
                  key={i}
                  player={player}
                  userIsAdmin={user.admin}
                  updateStatus={changeStatus}
                  onChange={handleBtnClick}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {showDialog && player ? <DeleteDialog closeDialog={handleChange} playerToDelete={player} /> : null}
    </>
  );
}
