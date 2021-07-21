import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresStackedChart from '../../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../../Sections/PageContent';
import { fetchPlayerScores } from '../../../store/scores/action-creators';
import { selectPlayerScores } from '../../../store/scores/selectors';
import { colorPrimary, colorSecondary } from '../../../theme/chartColors';

const ScoresPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const scoresPlayer = useSelector(selectPlayerScores);
  const name = scoresPlayer ? scoresPlayer.name : 'Speler...';

  useEffect(() => {
    dispatch(fetchPlayerScores(+id));
  }, [dispatch, id]);

  return (
    <PageContent
      loadingText="Scores"
      content={
        scoresPlayer ? (
          <>
            <PageTitle title={`Scores ${name}`} color="secondary" />
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorSecondary}
              colorHover={colorPrimary}
              loggedInUser={false}
            />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor ${name}`} />
        )
      }
    />
  );
};

export default ScoresPlayer;
