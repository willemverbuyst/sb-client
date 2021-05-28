import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';

import TableComponent from '../../../Components/Table';
import DeleteDialog from '../../../Components/Toast/DeleteDialog';
import { IPlayer } from '../../../models/player.model';
import { playerDelete } from '../../../store/players/actions';
import TableWithPlayersContent from './TableWithPlayersContent';
import TableWithPlayersHeaders from './TableWithPlayersHeaders';

type IProps = {
  players: IPlayer[];
};

const TableWithPlayers: React.FC<IProps> = ({ players }: IProps): ReactElement => {
  const dispatch = useDispatch();
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

  return (
    <TableComponent
      tableHeaders={<TableWithPlayersHeaders />}
      tableContent={<TableWithPlayersContent players={players} handleBtnClick={handleBtnClick} />}
      dialog={renderDialog()}
    />
  );
};

export default TableWithPlayers;
