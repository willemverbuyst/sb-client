import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../../Components/Message';
import PageHeaderWithButton from '../../../Components/PageHeader/PageHeaderWithBtn';
import PageHeaderWithoutButton from '../../../Components/PageHeader/PageHeaderWithoutBtn';
import ProgressComponent from '../../../Components/Progress';
import PlayersTable from '../../../Components/Table/PlayersTable';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchAllPlayers } from '../../../store/players/actions';
import { selectPlayers } from '../../../store/players/selectors';
import { selectToken, selectUser } from '../../../store/user/selectors';

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
  const userIsAdmin = user && user.admin ? true : false;
  const caption = update ? 'KLAAR' : 'EDIT SPELER';

  return (
    <Box>
      {userIsAdmin ? (
        <PageHeaderWithButton title="Spelers" captionBtn={caption} colorBtn="secondary" handleClick={editAdminStatus} />
      ) : (
        <PageHeaderWithoutButton title="Spelers" />
      )}

      {isLoading ? (
        <ProgressComponent />
      ) : players ? (
        <PlayersTable players={players} changeStatus={update} />
      ) : (
        <MessageComponent message={`Geen speleres gevonden`} />
      )}
    </Box>
  );
};

export default ListOfPlayers;
