import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import { fetchAllPlayers } from '../../../store/players/action-creators';
import { selectPlayers } from '../../../store/players/selectors';
import PageContent from '../../Sections/PageContent';
import TableWithPlayers from './TableWithPlayers';

const ListOfPlayers: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const players = useSelector(selectPlayers);

  useEffect(() => {
    if (!players) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, players]);

  return (
    <PageContent
      loadingText="Spelers"
      content={
        players ? (
          <>
            <PageHeaderWithoutButton title="Spelers" />
            <TableWithPlayers players={players} />
          </>
        ) : (
          <MessageComponent message={`Geen spelers gevonden`} />
        )
      }
    />
  );
};

export default ListOfPlayers;
