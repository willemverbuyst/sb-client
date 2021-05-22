import { Box, Grid } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ScoresBarChart from '../../../Components/Chart/ScoresBarChart';
import DividerComponent from '../../../Components/Divider';
import Message from '../../../Components/Message';
import ProgressComponent from '../../../Components/Progress';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresTotalToto } from '../../../store/scores/actions';
import { selectTotalToto } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import BreadCrumbsSection from './BreadCrumbsSection';
import TopSection from './TopSection';

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totalToto = useSelector(selectTotalToto);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!totalToto) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, totalToto]);

  const totalTotoSortedByUserName: UserWithScore[] = totalToto
    ? [...totalToto].sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()))
    : [];

  return (
    <Box>
      <TopSection />

      {isLoading ? (
        <ProgressComponent />
      ) : totalToto && totalToto.length > 0 ? (
        <>
          <SubTitleComponent text="TOTAAL TOTO" />
          <DividerComponent />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totalTotoSortedByUserName} />
            </Grid>
          </Grid>
          <BreadCrumbsSection />
        </>
      ) : (
        <Message message={`Nog geen scores voor totalToto`} />
      )}
    </Box>
  );
};

export default TotalToto;
