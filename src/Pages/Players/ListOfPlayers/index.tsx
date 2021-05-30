import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../../Components/Header/PageHeaderWithoutBtn';
import { fetchAllPlayers } from '../../../store/players/actions-creators';
import { selectPlayers } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import PageContent from '../../Sections/PageContent';
import TableWithPlayers from './TableWithPlayers';

const ListOfPlayers: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const players = useSelector(selectPlayers);
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!players) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, players]);

  return (
    <PageContent
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
