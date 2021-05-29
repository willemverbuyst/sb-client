import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import ProgressComponent from '../../../Components/Progress';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { selectAppLoading } from '../../../store/appState/selectors';
import { fetchScoresTotalToto } from '../../../store/scores/actions';
import { selectTotalToto } from '../../../store/scores/selectors';
import { UserWithScore } from '../../../store/scores/types';
import { selectToken } from '../../../store/user/selectors';
import ScoresBarChart from '../../Sections/Charts/ScoresBarChart';
import BreadCrumbsSection from './BreadCrumbsSection';

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

  const gotoTotoRound = () => history.push(`/voorspellingen/1/1`);

  return (
    <Box>
      <PageHeaderWithButton
        title="Klassement"
        captionBtn="MIJN VOORSPELLINGEN"
        colorBtn="primary"
        handleClick={gotoTotoRound}
      />

      {isLoading ? (
        <ProgressComponent />
      ) : totalToto && totalToto.length > 0 ? (
        <>
          <SubTitleComponent text="TOTAAL TOTO" />
          <DividerComponent />
          <ScoresBarChart scores={totalTotoSortedByUserName} />
          <BreadCrumbsSection />
        </>
      ) : (
        <MessageComponent message={`Nog geen scores voor totalToto`} />
      )}
    </Box>
  );
};

export default TotalToto;
