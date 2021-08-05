import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresTotalToto } from '../../../store/scores/action-creators';
import { selectScoresTotalTotoSortedByScore } from '../../../store/scores/selectors';

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresTotalTotoSortedByScore = useSelector(
    selectScoresTotalTotoSortedByScore,
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!scoresTotalTotoSortedByScore) {
      (async () => {
        await dispatch(fetchScoresTotalToto());
        if (!scoresTotalTotoSortedByScore) {
          setMessage('Nog geen scores voor de totaalToto');
        }
      })();
    }
  }, [dispatch, scoresTotalTotoSortedByScore]);

  return (
    <PageContent
      loadingText=""
      content={
        <>
          <PageTitle title="Totaaltoto" color="secondary" />
          {scoresTotalTotoSortedByScore ? (
            <ScoresBarChart scores={scoresTotalTotoSortedByScore} />
          ) : (
            <MessageComponent message={message} />
          )}
        </>
      }
    />
  );
};

export default TotalToto;
