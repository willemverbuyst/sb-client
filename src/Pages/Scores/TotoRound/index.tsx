import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { fetchScoresTotoRound } from '../../../store/scores/action-creators';
import { selectScoresRoundSortedByName, selectTotoRoundId } from '../../../store/scores/selectors';
import ScoresBarChart from '../../Sections/Charts/ScoresBarChart';
import PageContent from '../../Sections/PageContent';
import BreadCrumbsSection from './BreadCrumbsSection';

const TotoRound: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const totoRoundId = useSelector(selectTotoRoundId);
  const scoresRoundSortedByName = useSelector(selectScoresRoundSortedByName);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!totoRoundId || Number(id) !== totoRoundId) {
      dispatch(fetchScoresTotoRound(+id));
    }
  }, [dispatch, id, totoRoundId]);

  const gotoTotoRound = () => history.push(`/voorspellingen/${id}/${+id * 3 - 2}`);

  return (
    <PageContent
      loadingText="Klassement"
      content={
        scoresRoundSortedByName ? (
          <>
            <PageHeaderWithButton
              title="Klassement"
              captionBtn="MIJN VOORSPELLINGEN"
              colorBtn="primary"
              handleClick={gotoTotoRound}
            />
            <SubTitleComponent text={`TOTO RONDE ${id}`} />
            <DividerComponent />
            <ScoresBarChart scores={scoresRoundSortedByName} />
            <BreadCrumbsSection id={id} />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores voor toto ronde ${id}`} />
        )
      }
    />
  );
};

export default TotoRound;
