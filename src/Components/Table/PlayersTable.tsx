import { Grid, Table, TableContainer } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useState } from 'react';

import { IPlayer } from '../../models/player.model';
import DeleteDialog from '../Toast/DeleteDialog';
import TableContent from './TableContent';
import TableHeaders from './TableHeaders';

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
  const [showDialog, setShowDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<IPlayer | null>(null);

  const handleChange = (): void => {
    setShowDialog(!showDialog);
  };

  const handleBtnClick = (player: IPlayer): void => {
    setPlayerToDelete(player);
    setShowDialog(!showDialog);
  };

  const renderDialog = (): ReactElement | null =>
    showDialog && playerToDelete ? <DeleteDialog closeDialog={handleChange} playerToDelete={playerToDelete} /> : null;

  return (
    <Grid container justify="center">
      <Grid item xs={10} className={classes.playersTable}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHeaders />
            <TableContent players={players} handleBtnClick={handleBtnClick} />
          </Table>
        </TableContainer>
      </Grid>
      {renderDialog()}
    </Grid>
  );
};

export default PlayersTable;
