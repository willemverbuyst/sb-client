import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { fetchPlayerScores } from '../../../store/players/action-creators';
import { selectPlayerScores } from '../../../store/players/selectors';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';
import ScoresStackedChart from '../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../Sections/PageContent';

const ScoresPlayer: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const scoresPlayer = useSelector(selectPlayerScores);
  const name = scoresPlayer ? scoresPlayer.userName : 'Speler...';

  useEffect(() => {
    dispatch(fetchPlayerScores(+id));
  }, [dispatch, id]);

  const gotoPredictions = () => history.push(`/spelers/${id}/voorspellingen/1/1`);

  return (
    <PageContent
      loadingText="Scores"
      content={
        scoresPlayer ? (
          <>
            <PageHeaderWithButton
              title={`Scores ${name}`}
              captionBtn={`VOORSPELLINGEN ${name}`}
              colorBtn="secondary"
              handleClick={gotoPredictions}
            />
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorSecondary}
              colorHover={colorPrimary}
              loggedInUser={false}
            />
          </>
        ) : (
          <MessageComponent message={`Nog geen scores`} />
        )
      }
    />
  );
};

export default ScoresPlayer;
