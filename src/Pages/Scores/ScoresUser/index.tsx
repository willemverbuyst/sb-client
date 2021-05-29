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
import { fetchPlayerScores } from '../../../store/players/actions-creators';
import { selectPlayerScores } from '../../../store/players/selectors';
import { selectToken, selectUser } from '../../../store/user/selectors';
import { colorPrimary, colorSecondary } from '../../../ui/theme/chartColors';
import ScoresStackedChart from '../../Sections/Charts/ScoresStackedChart';

const ScoresUser: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);
  const scoresPlayer = useSelector(selectPlayerScores);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    // update logic!
    if (user && !scoresPlayer) {
      dispatch(fetchPlayerScores(Number(user.id)));
    }
  });

  const goto = () => history.push(`/voorspellingen/1/1`);

  return (
    <Box>
      <PageHeaderWithButton title="Scores" captionBtn="VOORSPELLINGEN" colorBtn="primary" handleClick={goto} />

      {isLoading ? (
        <ProgressComponent />
      ) : scoresPlayer ? (
        <>
          <SubTitleComponent text="MIJN TOTO RONDES" />
          <DividerComponent />
          <ScoresStackedChart
            scoresPlayer={scoresPlayer}
            colorMain={colorPrimary}
            colorHover={colorSecondary}
            loggedInUser={true}
          />
        </>
      ) : (
        <MessageComponent message={`Je hebt nog geen scores`} />
      )}
    </Box>
  );
};

export default ScoresUser;
