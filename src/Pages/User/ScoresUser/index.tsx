import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import { fetchPlayerScores } from '../../../store/players/action-creators';
import { selectPlayerScores } from '../../../store/players/selectors';
import { selectUser } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';
import ScoresStackedChart from '../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../Sections/PageContent';

const ScoresUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const scoresPlayer = useSelector(selectPlayerScores);

  useEffect(() => {
    // update logic!
    if (user && !scoresPlayer) {
      dispatch(fetchPlayerScores(Number(user.id)));
    }
  });

  return (
    <PageContent
      loadingText="Mijn scores"
      content={
        scoresPlayer ? (
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
          <MessageComponent message={`Je hebt nog geen scores`} />
        )
      }
    />
  );
};

export default ScoresUser;