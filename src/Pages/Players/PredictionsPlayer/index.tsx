import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchPlayerProfile } from '../../../store/players/actions-creators';
import { selectPastFixturesWithScoresPlayer, selectUserNamePlayer } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import FixturesSection from './FixturesSection';
import PaginationSection from './PaginationSection';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  const { totoronde } = useParams<{ totoronde: string }>();
  const token = useSelector(selectToken);
  const userNamePlayer = useSelector(selectUserNamePlayer);
  const pastFixturesWithScores = useSelector(selectPastFixturesWithScoresPlayer);
  const isLoading = useSelector(selectAppLoading);

  const name = userNamePlayer ? userNamePlayer : 'Speler...';

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerProfile(Number(id)));
  }, [dispatch, id]);

  const gotoScores = () => history.push(`/spelers/${id}/scores`);

  return (
    <Box>
      <PageHeaderWithButton title={name} captionBtn="SCORES" colorBtn="secondary" handleClick={gotoScores} />

      {isLoading ? (
        <ProgressComponent />
      ) : pastFixturesWithScores ? (
        <>
          <FixturesSection pastFixturesWithScores={pastFixturesWithScores} totoronde={totoronde} ronde={ronde} />
          <PaginationSection
            totoronde={totoronde}
            ronde={ronde}
            pastFixturesWithScores={pastFixturesWithScores}
            id={id}
          />
        </>
      ) : (
        <MessageComponent message={`Geen voorspellingen voor gevonden`} />
      )}
    </Box>
  );
};

export default PredictionsPlayer;
