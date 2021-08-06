import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresStackedChart from '../../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../../Sections/PageContent';
import { fetchPlayerScores } from '../../../store/scores/action-creators';
import {
  selectPlayerHasScores,
  selectPlayerScores,
} from '../../../store/scores/selectors';
import { colorPrimary, colorSecondary } from '../../../theme/chartColors';

const ScoresPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const scoresPlayer = useSelector(selectPlayerScores);
  const playerHasScores = useSelector(selectPlayerHasScores);
  const name = scoresPlayer ? scoresPlayer.name : 'Speler...';
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      await dispatch(fetchPlayerScores(Number(id)));
      if (!playerHasScores) {
        setMessage(`Nog geen scores`);
      }
    })();
  }, [dispatch, id]);

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title={`Scores ${name}`} color="secondary" />
          {scoresPlayer && playerHasScores ? (
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorSecondary}
              colorHover={colorPrimary}
              loggedInUser={false}
            />
          ) : (
            <MessageComponent message={message} />
          )}
        </>
      }
    />
  );
};

export default ScoresPlayer;
