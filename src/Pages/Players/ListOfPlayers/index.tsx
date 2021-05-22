import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Message from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import PlayersTable from '../../../Components/Table/PlayersTable';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchAllPlayers } from '../../../store/players/actions';
import { selectPlayers } from '../../../store/players/selectors';
import { selectToken, selectUser } from '../../../store/user/selectors';
import TopSection from './TopSection';

const ListOfPlayers: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);
  const players = useSelector(selectPlayers);
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!players) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, players]);

  const editAdminStatus = () => setUpdate(!update);
  const displayButton = user && user.admin ? true : false;

  return (
    <Box>
      <TopSection displayButton={displayButton} update={update} editAdminStatus={editAdminStatus} />

      {isLoading ? (
        <ProgressComponent />
      ) : players ? (
        <PlayersTable players={players} changeStatus={update} />
      ) : (
        <Message message={`Geen speleres gevonden`} />
      )}
    </Box>
  );
};

export default ListOfPlayers;
