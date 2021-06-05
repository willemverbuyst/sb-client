import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { fetchScoresTotalToto } from '../../../store/scores/action-creators';
import { selectScoresTotalTotoSortedByScore } from '../../../store/scores/selectors';
import ScoresBarChart from '../../Sections/Charts/ScoresBarChart';
import PageContent from '../../Sections/PageContent';
import BreadCrumbsSection from './BreadCrumbsSection';

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const scoresTotalTotoSortedByName = useSelector(selectScoresTotalTotoSortedByName);
  const scoresTotalTotoSortedByScore = useSelector(selectScoresTotalTotoSortedByScore);

  useEffect(() => {
    if (!scoresTotalTotoSortedByScore) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, scoresTotalTotoSortedByScore]);

  const gotoTotoRound = () => history.push(`/voorspellingen/1/1`);

  return (
    <PageContent
      loadingText="Klassement"
      content={
        scoresTotalTotoSortedByScore ? (
          <>
            <PageHeaderWithButton
              title="Klassement"
              captionBtn="MIJN VOORSPELLINGEN"
              colorBtn="primary"
              handleClick={gotoTotoRound}
            />
            <SubTitleComponent text="TOTAAL TOTO" />
            <DividerComponent />
            <ScoresBarChart scores={scoresTotalTotoSortedByScore} />
            <BreadCrumbsSection />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor totalToto`} />
        )
      }
    />
  );
};

export default TotalToto;
