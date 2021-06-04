import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { IFixtureWithScoreAndPredictions } from '../../../models/toto.models';
import { fetchPlayerProfile } from '../../../store/players/action-creators';
import { selectPastFixturesWithScoresPlayer, selectUserNamePlayer } from '../../../store/players/selectors';
import { calculateIndex } from '../../../utils/parameterFunctions';
import { sortArrayWithObjects } from '../../../utils/sortFunctions';
import PageContent from '../../Sections/PageContent';
import Predictions from '../../Sections/Predictions';
import PaginationSection from './PaginationSection';

const PredictionsPlayer: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userNamePlayer = useSelector(selectUserNamePlayer);
  const pastFixturesWithScores = useSelector(selectPastFixturesWithScoresPlayer);
  const { id } = useParams<{ id: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  const { totoronde } = useParams<{ totoronde: string }>();

  const t = Number(totoronde);
  const r = Number(ronde);

  const name = userNamePlayer ? userNamePlayer : 'Speler...';

  useEffect(() => {
    dispatch(fetchPlayerProfile(Number(id)));
  }, [dispatch, id]);

  const filteredFixtures = pastFixturesWithScores ? [...pastFixturesWithScores[t - 1][calculateIndex(r)]] : null;

  const filteredAndSortedfixtures = filteredFixtures
    ? sortArrayWithObjects<keyof IFixtureWithScoreAndPredictions, IFixtureWithScoreAndPredictions>('eventTimeStamp')(
        filteredFixtures,
      )
    : null;

  const gotoScores = () => history.push(`/spelers/${id}/scores`);

  return (
    <PageContent
      loadingText="Speler..."
      content={
        pastFixturesWithScores && filteredAndSortedfixtures ? (
          <>
            <PageHeaderWithButton title={name} captionBtn="SCORES" colorBtn="secondary" handleClick={gotoScores} />
            <Predictions fixtures={filteredAndSortedfixtures} display="public" />
            <PaginationSection
              totoronde={totoronde}
              ronde={ronde}
              pastFixturesWithScores={pastFixturesWithScores}
              id={id}
            />
          </>
        ) : (
          <MessageComponent message={`Geen voorspellingen voor gevonden`} />
        )
      }
    />
  );
};

export default PredictionsPlayer;
