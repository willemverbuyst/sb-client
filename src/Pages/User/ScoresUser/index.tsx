import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresStackedChart from '../../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../../Sections/PageContent';
import { fetchPlayerScores } from '../../../store/scores/action-creators';
import { selectPlayerScores } from '../../../store/scores/selectors';
import { selectUser } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../theme/chartColors';

const ScoresUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresPlayer = useSelector(selectPlayerScores);
  const user = useSelector(selectUser);

  useEffect(() => {
    // update logic!
    if (user && !scoresPlayer) {
      dispatch(fetchPlayerScores(Number(user.id)));
    }
  });

  const scores =
    scoresPlayer && scoresPlayer.scores.flat().reduce((a, b) => a + b) !== 0
      ? true
      : false;

  return (
    <PageContent
      loadingText="Mijn scores"
      content={
        scoresPlayer && scores ? (
          <>
            <PageTitle title="Mijn scores" color="primary" />
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorPrimary}
              colorHover={colorSecondary}
              loggedInUser={true}
            />
          </>
        ) : (
          <MessageComponent message="Je hebt nog geen scores" />
        )
      }
    />
  );
};

export default ScoresUser;
