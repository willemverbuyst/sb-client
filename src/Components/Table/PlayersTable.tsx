import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';

import { IPlayer } from '../../models/player.model';
import { selectUser } from '../../store/user/selectors';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import DeleteDialog from '../Toast/DeleteDialog';
import PlayerRow from './PlayerRow';

const useStyles = makeStyles((theme: Theme) => ({
  playersTable: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(6),
  },
}));

type IProps = {
  players: IPlayer[];
};

const PlayersTable: React.FC<IProps> = ({ players }: IProps): ReactElement => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [showDialog, setShowDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<IPlayer | null>(null);

  const sortTable = (players: IPlayer[]): IPlayer[] =>
    sortArrayWithObjects<keyof IPlayer, IPlayer>('userName')(players);

  const handleChange = (): void => {
    setShowDialog(!showDialog);
  };

  const handleBtnClick = (player: IPlayer): void => {
    setPlayerToDelete(player);
    setShowDialog(!showDialog);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10} className={classes.playersTable}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">admin</TableCell>
                <TableCell align="left">user name</TableCell>
                <TableCell align="left">team</TableCell>
                <TableCell align="center">totaal-toto</TableCell>
                <TableCell align="left">naam</TableCell>

                {user && user.admin ? (
                  <>
                    <TableCell align="left">achternaam</TableCell>
                    <TableCell align="left">telefoon</TableCell>
                    <TableCell align="left">email</TableCell>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left"></TableCell>
                  </>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortTable(players).map((player, i) => (
                <PlayerRow key={i} player={player} userIsAdmin={user ? user.admin : false} onChange={handleBtnClick} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showDialog && playerToDelete ? (
          <DeleteDialog closeDialog={handleChange} playerToDelete={playerToDelete} />
        ) : null}
      </Grid>
    </Grid>
  );
};

export default PlayersTable;
