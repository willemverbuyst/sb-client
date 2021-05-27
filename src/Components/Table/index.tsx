import { Grid, Table, TableContainer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPlayer } from '../../models/player.model';
import { playerDelete } from '../../store/players/actions';
import { selectUser } from '../../store/user/selectors';
import DeleteDialog from '../Toast/DeleteDialog';
import TableContent from './TableContent';
import TableHeaders from './TableHeaders';
import { Align } from './types';

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showDialog, setShowDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<IPlayer | null>(null);

  const closeDialog = (): void => {
    setShowDialog(false);
  };

  const handleBtnClick = (player: IPlayer): void => {
    setPlayerToDelete(player);
    setShowDialog(true);
  };

  const renderDialog = (): ReactElement | null => {
    if (showDialog && playerToDelete) {
      const title = `Weet je zeker dat je ${playerToDelete.firstName} ${playerToDelete.lastName} wilt verwijderen?`;
      const content =
        'Wanneer je deze speler verwijderd, wordt alle data uit de database gewist. Er is dan geen weg terug...';

      const handleDelete = () => {
        dispatch(playerDelete(Number(playerToDelete.id)));
        closeDialog();
      };

      return <DeleteDialog closeDialog={closeDialog} title={title} content={content} handleDelete={handleDelete} />;
    } else {
      return null;
    }
  };

  const renderTableHeaders = () => {
    const headersRegularUser: [string, Align][] = [
      ['admin', 'center'],
      ['user name', 'left'],
      ['team', 'left'],
      ['totaal-toto', 'center'],
      ['naam', 'left'],
    ];
    const headersAdmin: [string, Align][] = [
      ...headersRegularUser,
      ['achternaam', 'left'],
      ['telefoon', 'left'],
      ['email', 'left'],
    ];
    return <TableHeaders headers={user && user.admin ? headersAdmin : headersRegularUser} />;
  };

  return (
    <Grid container justify="center">
      <Grid item xs={10} className={classes.playersTable}>
        <TableContainer>
          <Table aria-label="simple table">
            {renderTableHeaders()}
            <TableContent players={players} handleBtnClick={handleBtnClick} />
          </Table>
        </TableContainer>
      </Grid>
      {renderDialog()}
    </Grid>
  );
};

export default PlayersTable;
