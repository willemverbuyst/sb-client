import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../Components/Communication/Message';
import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import { fetchCurrentRound } from '../../store/predictions/action-creators';
import { selectCurrentRoundSortedByTime } from '../../store/predictions/selectors';
import PageContent from '../Sections/PageContent';
import Predictions from '../Sections/Predictions';

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
            <PageHeaderWithoutButton title="Programma" />
            <Predictions fixtures={currentRoundSortedByTime} display="private" />
          </>
        ) : (
          <MessageComponent message={`Er staan voor deze week geen wedstrijden gepland.`} />
        )
      }
    />
  );
};

export default Program;
