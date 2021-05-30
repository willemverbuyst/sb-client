import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import DividerComponent from '../../../Components/Divider';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import SubTitleComponent from '../../../Components/Title/SubTitle';
import { fetchPlayerScores } from '../../../store/players/actions-creators';
import { selectPlayerScores } from '../../../store/players/selectors';
import { selectToken } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';
import ScoresStackedChart from '../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../Sections/PageContent';

const ScoresPlayer: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const scoresPlayer = useSelector(selectPlayerScores);
  const token = useSelector(selectToken);
  const name = scoresPlayer ? scoresPlayer.userName : 'Speler...';

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerScores(+id));
  }, [dispatch, id]);

  const gotoPredictions = () => history.push(`/spelers/${id}/voorspellingen/1/1`);

  return (
    <PageContent
      loadingText="Speler..."
      content={
        scoresPlayer ? (
          <>
            <PageHeaderWithButton
              title={name}
              captionBtn="VOORSPELLINGEN"
              colorBtn="secondary"
              handleClick={gotoPredictions}
            />
            <SubTitleComponent text="TOTO RONDES" />
            <DividerComponent />
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
