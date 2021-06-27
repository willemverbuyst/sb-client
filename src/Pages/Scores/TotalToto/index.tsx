import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import PageContent from '../../../Sections/PageContent';
import { fetchScoresTotalToto } from '../../../store/scores/action-creators';
import { selectScoresTotalTotoSortedByScore } from '../../../store/scores/selectors';

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const scoresTotalTotoSortedByScore = useSelector(selectScoresTotalTotoSortedByScore);

  useEffect(() => {
    if (!scoresTotalTotoSortedByScore) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, scoresTotalTotoSortedByScore]);

  return (
    <PageContent
      loadingText="Totaaltoto"
      content={
        scoresTotalTotoSortedByScore ? (
          <>
            <PageTitle title="Totaaltoto" color="secondary" />
            <ScoresBarChart scores={scoresTotalTotoSortedByScore} />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor totalToto`} />
        )
      }
    />
  );
};

export default TotalToto;
