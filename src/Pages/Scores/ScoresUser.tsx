import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import ScoresStackedChart from '../../Components/Chart/ScoresStackedChart';
import DividerComponent from '../../Components/Divider';
import Message from '../../Components/Message';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PageTitle from '../../Components/Title/PageTitle';
import SubTitle from '../../Components/Title/SubTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchPlayerScores } from '../../store/players/actions';
import { selectPlayerScores } from '../../store/players/selectors';
import { selectToken, selectUser } from '../../store/user/selectors';
import { topSection } from '../../ui/sharedClasses';
import { colorPrimary, colorSecondary } from '../../ui/theme/chartColors';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const ScoresUser: React.FC = (): ReactElement => {
  const classes = useStyles();
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
      dispatch(fetchPlayerScores(+user.id));
    }
  });

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitle text="Scores" />
        {isLoading ? null : (
          <ButtonComponent
            caption="VOORSPELLINGEN"
            color="primary"
            handleClick={() => history.push(`/voorspellingen/1/1`)}
          />
        )}
      </Grid>

      {isLoading ? (
        <ProgressLinear />
      ) : scoresPlayer ? (
        <>
          <SubTitle text="MIJN TOTO RONDES" />
          <DividerComponent />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresStackedChart
                scoresPlayer={scoresPlayer}
                colorMain={colorPrimary}
                colorHover={colorSecondary}
                loggedInUser={true}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Message message={`Je hebt nog geen scores`} />
      )}
    </Box>
  );
};

export default ScoresUser;
