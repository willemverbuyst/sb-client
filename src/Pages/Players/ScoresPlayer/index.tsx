import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/PageHeader/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchPlayerScores } from '../../../store/players/actions';
import { selectPlayerScores } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import ScoresSection from './ScoresSection';

const ScoresPlayer: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scoresPlayer = useSelector(selectPlayerScores);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerScores(+id));
  }, [dispatch, id]);

  const gotoPredictions = () => history.push(`/spelers/${id}/voorspellingen/1/1`);
  const name = scoresPlayer ? scoresPlayer.userName : 'Speler...';

  return (
    <Box>
      <PageHeaderWithButton
        title={name}
        captionBtn="VOORSPELLINGEN"
        colorBtn="secondary"
        handleClick={gotoPredictions}
      />

      {isLoading ? (
        <ProgressComponent />
      ) : scoresPlayer ? (
        <ScoresSection scoresPlayer={scoresPlayer} />
      ) : (
        <MessageComponent message={`Nog geen scores`} />
      )}
    </Box>
  );
};

export default ScoresPlayer;
