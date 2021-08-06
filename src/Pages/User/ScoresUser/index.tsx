import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresStackedChart from '../../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../../Sections/PageContent';
import { fetchPlayerScores } from '../../../store/scores/action-creators';
import {
  selectPlayerHasScores,
  selectPlayerScores,
} from '../../../store/scores/selectors';
import { selectUser } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../theme/chartColors';

const ScoresUser: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresPlayer = useSelector(selectPlayerScores);
  const playerHasScores = useSelector(selectPlayerHasScores);
  const user = useSelector(selectUser);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      await dispatch(fetchPlayerScores(Number(user?.id)));
      if (!playerHasScores) {
        setMessage('Je hebt nog geen scores');
      }
    })();
  }, [dispatch, user]);

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title="Mijn scores" color="primary" />
          {scoresPlayer && playerHasScores ? (
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorPrimary}
              colorHover={colorSecondary}
              loggedInUser={true}
            />
          ) : (
            <MessageComponent message={message} />
          )}
        </>
      }
    />
  );
};

export default ScoresUser;
