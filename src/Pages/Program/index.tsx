import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import MessageComponent from '../../Components/Communication/Message';
import PageTitle from '../../Components/Title/PageTitle';
import PageContent from '../../Sections/PageContent';
import Predictions from '../../Sections/Predictions';
import { selectCurrentRoundSortedByTime } from '../../store/user/selectors';

const Program: React.FC = (): ReactElement => {
  const currentRoundSortedByTime = useSelector(selectCurrentRoundSortedByTime);

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title="Programma" color="secondary" />
          {currentRoundSortedByTime ? (
            <Predictions
              predictions={currentRoundSortedByTime}
              display="private"
            />
          ) : (
            <MessageComponent message="Er staan voor deze week geen wedstrijden gepland." />
          )}
        </>
      }
    />
  );
};

export default Program;
