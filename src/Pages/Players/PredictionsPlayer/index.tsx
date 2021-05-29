import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchPlayerProfile } from '../../../store/players/actions-creators';
import { selectPlayerProfile } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import FixturesSection from './FixturesSection';

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
  const name = playerProfile ? playerProfile.userName : 'Speler...';

  return (
    <Box>
      <PageHeaderWithButton title={name} captionBtn="SCORES" colorBtn="secondary" handleClick={gotoScores} />

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
