import React, { ReactElement, useState } from 'react';

import TableComponent from '../../../Components/Table';
import { IPlayer } from '../../../models/player.model';
import TableWithPlayersContent from './TableWithPlayersContent';
import TableWithPlayersDialog from './TableWithPlayersDialog';
import TableWithPlayersHeaders from './TableWithPlayersHeaders';

type IProps = {
  playersSortedByName: IPlayer[];
};

const TableWithPlayers: React.FC<IProps> = ({ playersSortedByName }: IProps): ReactElement => {
  const [showDialog, setShowDialog] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState<IPlayer | null>(null);

  const closeDialog = (): void => {
    setShowDialog(false);
  };

  const handleBtnClick = (player: IPlayer): void => {
    setPlayerToDelete(player);
    setShowDialog(true);
  };

  return (
    <TableComponent
      tableHeaders={<TableWithPlayersHeaders />}
      tableContent={
        <TableWithPlayersContent playersSortedByName={playersSortedByName} handleBtnClick={handleBtnClick} />
      }
      dialog={
        showDialog && playerToDelete ? (
          <TableWithPlayersDialog playerToDelete={playerToDelete} closeDialog={closeDialog} />
        ) : null
      }
    />
  );
};

export default TableWithPlayers;
