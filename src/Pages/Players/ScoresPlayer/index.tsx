import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresStackedChart from '../../../Components/Chart/ScoresStackedChart';
import DividerComponent from '../../../Components/Divider';
import MessageComponent from '../../../Components/Message';
import PageHeaderWithButton from '../../../Components/PageHeader/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchPlayerScores } from '../../../store/players/actions';
import { selectPlayerScores } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';

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
        <>
          <SubTitleComponent text="TOTO RONDES" />
          <DividerComponent />
          <ScoresStackedChart
            scoresPlayer={scoresPlayer}
            colorMain={colorSecondary}
            colorHover={colorPrimary}
            loggedInUser={false}
          />
        </>
      ) : (
        <MessageComponent message={`Nog geen scores`} />
      )}
    </Box>
  );
};

export default ScoresPlayer;
