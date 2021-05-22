import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchPlayerProfile } from '../../../store/players/actions';
import { selectPlayerProfile } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import FixturesSection from './FixturesSection';
import TopSection from './TopSection';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const playerProfile = useSelector(selectPlayerProfile);
  const isLoading = useSelector(selectAppLoading);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerProfile(+id));
  }, [dispatch, id]);

  const gotoScores = () => history.push(`/spelers/${id}/scores`);

  return (
    <Box>
      <TopSection name={playerProfile ? playerProfile.userName : 'Speler...'} gotoScores={gotoScores} />

      {isLoading ? (
        <ProgressComponent />
      ) : playerProfile && playerProfile.pastFixturesWithScores ? (
        <FixturesSection playerProfile={playerProfile} totoronde={totoronde} ronde={ronde} id={id} />
      ) : (
        <MessageComponent message={`Geen voorspellingen voor gevonden`} />
      )}
    </Box>
  );
};

export default PredictionsPlayer;
