import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MessageComponent from '../../../Components/Communication/Message';
import PageHeaderWithButton from '../../../Components/Header/PageHeaderWithBtn';
import { fetchPlayerScores } from '../../../store/players/action-creators';
import { selectPlayerScores } from '../../../store/players/selectors';
import { selectUser } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';
import ScoresStackedChart from '../../Sections/Charts/ScoresStackedChart';
import PageContent from '../../Sections/PageContent';

const ScoresUser: React.FC = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const scoresPlayer = useSelector(selectPlayerScores);

  useEffect(() => {
    // update logic!
    if (user && !scoresPlayer) {
      dispatch(fetchPlayerScores(Number(user.id)));
    }
  });

  const goto = () => history.push(`/voorspellingen/1/1`);

  return (
    <PageContent
      loadingText="Mijn scores"
      content={
        scoresPlayer ? (
          <>
            <PageHeaderWithButton
              title="Mijn scores"
              captionBtn="VOORSPELLINGEN"
              colorBtn="primary"
              handleClick={goto}
            />
            <ScoresStackedChart
              scoresPlayer={scoresPlayer}
              colorMain={colorPrimary}
              colorHover={colorSecondary}
              loggedInUser={true}
            />
          </>
        ) : (
          <MessageComponent message={`Je hebt nog geen scores`} />
        )
      }
    />
  );
};

export default ScoresUser;
