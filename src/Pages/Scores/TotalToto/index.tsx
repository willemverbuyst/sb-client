import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MessageComponent from '../../../Components/Communication/Message';
import ProgressComponent from '../../../Components/Progress';
import PageTitle from '../../../Components/Title/PageTitle';
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresTotalToto } from '../../../store/scores/action-creators';
import { selectScoresTotalTotoSortedByScore } from '../../../store/scores/selectors';

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scoresTotalTotoSortedByScore = useSelector(
    selectScoresTotalTotoSortedByScore,
  );

  useEffect(() => {
    if (!scoresTotalTotoSortedByScore) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, scoresTotalTotoSortedByScore]);

  return (
    <Box>
      <PageTitle title="Totaaltoto" color="secondary" />
      {isLoading ? (
        <ProgressComponent />
      ) : scoresTotalTotoSortedByScore ? (
        <ScoresBarChart scores={scoresTotalTotoSortedByScore} />
      ) : (
        <MessageComponent message="Nog geen scores voor de totaalToto" />
      )}
    </Box>
  );
};

export default TotalToto;
