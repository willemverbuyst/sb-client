import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { IUserWithScore } from '../../../models/scores.models';
import { fetchScoresTotalToto } from '../../../store/scores/action-creators';
import { selectTotalToto } from '../../../store/scores/selectors';
import ScoresBarChart from '../../Sections/Charts/ScoresBarChart';
import PageContent from '../../Sections/PageContent';
import BreadCrumbsSection from './BreadCrumbsSection';

const TotalToto: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const totalToto = useSelector(selectTotalToto);

  useEffect(() => {
    if (!totalToto) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, totalToto]);

  const totalTotoSortedByUserName: IUserWithScore[] = totalToto
    ? [...totalToto].sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()))
    : [];

  const gotoTotoRound = () => history.push(`/voorspellingen/1/1`);

  return (
    <PageContent
      loadingText="Klassement"
      content={
        totalToto && totalToto.length > 0 ? (
          <>
            <PageHeaderWithButton
              title="Klassement"
              captionBtn="MIJN VOORSPELLINGEN"
              colorBtn="primary"
              handleClick={gotoTotoRound}
            />
            <SubTitleComponent text="TOTAAL TOTO" />
            <DividerComponent />
            <ScoresBarChart scores={totalTotoSortedByUserName} />
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
