import { TableBody } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableComponent from '../../../Components/Table';
import RowWithPlayer from '../../../Components/Table/RowWithPlayer';
import TableHeaders from '../../../Components/Table/TableHeaders';
import { Align } from '../../../Components/Table/types';
import DeleteDialog from '../../../Components/Toast/DeleteDialog';
import { IPlayer } from '../../../models/player.model';
import { playerDelete } from '../../../store/players/actions';
import { selectUser } from '../../../store/user/selectors';
import { sortArrayWithObjects } from '../../../utils/sortFunctions';

type IProps = {
  players: IPlayer[];
};

const TableWithPlayers: React.FC<IProps> = ({ players }: IProps): ReactElement => {
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

  const RenderTableContent = (): ReactElement => {
    const sortTable = (players: IPlayer[]): IPlayer[] =>
      sortArrayWithObjects<keyof IPlayer, IPlayer>('userName')(players);

    const tableContent = (): ReactElement[] =>
      sortTable(players).map((player, i) => <RowWithPlayer key={i} player={player} onChange={handleBtnClick} />);

    return <TableBody>{tableContent()}</TableBody>;
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
    <TableComponent tableHeaders={renderTableHeaders()} tableContent={RenderTableContent()} dialog={renderDialog()} />
  );
};

export default TableWithPlayers;
