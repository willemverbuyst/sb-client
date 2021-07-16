import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../Components/Communication/Message';
import PageTitle from '../../Components/Title/PageTitle';
import PageContent from '../../Sections/PageContent';
import Predictions from '../../Sections/Predictions';
import { fetchCurrentRound } from '../../store/predictions/action-creators';
import { selectCurrentRoundSortedByTime } from '../../store/user/selectors';

const Program: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const currentRoundSortedByTime = useSelector(selectCurrentRoundSortedByTime);

  useEffect(() => {
    if (!currentRoundSortedByTime) {
      dispatch(fetchCurrentRound());
    }
  }, [dispatch, currentRoundSortedByTime]);

  return (
    <PageContent
      loadingText="Programma"
      content={
        currentRoundSortedByTime ? (
          <>
            <PageTitle title="Programma" color="secondary" />
            <Predictions
              fixtures={currentRoundSortedByTime}
              display="private"
            />
          </>
        ) : (
          <MessageComponent
            message={`Er staan voor deze week geen wedstrijden gepland.`}
          />
        )
      }
    />
  );
};

export default Program;
