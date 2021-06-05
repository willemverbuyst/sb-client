import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import { fetchAllPlayers } from '../../../store/players/action-creators';
import { selectPlayersSortedByName } from '../../../store/players/selectors';
import PageContent from '../../Sections/PageContent';
import TableWithPlayers from './TableWithPlayers';

const ListOfPlayers: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const playersSortedByName = useSelector(selectPlayersSortedByName);

  useEffect(() => {
    if (!playersSortedByName) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, playersSortedByName]);

  return (
    <PageContent
      loadingText="Spelers"
      content={
        playersSortedByName ? (
          <>
            <PageHeaderWithoutButton title="Spelers" />
            <TableWithPlayers playersSortedByName={playersSortedByName} />
          </>
        ) : (
          <MessageComponent message={`Geen spelers gevonden`} />
        )
      }
    />
  );
};

export default ListOfPlayers;
