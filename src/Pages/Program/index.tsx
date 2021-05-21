import { Box, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MatchCard from '../../Components/Card/MatchCard';
import Message from '../../Components/Message';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PageTitle from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchCurrentRound } from '../../store/predictions/actions';
import { selectCurrentRound } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import { content, progress, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...content(theme),
  ...progress(),
  ...topSection(theme),
}));

const Program: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentRound = useSelector(selectCurrentRound);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!currentRound) {
      dispatch(fetchCurrentRound());
    }
  }, [dispatch, currentRound]);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitle text="Programma" />
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : currentRound ? (
        <Grid item xs={12} container justify="center" className={classes.content}>
          {currentRound.fixtures.map((wedstrijd, i) => (
            <Grid item key={i} lg={4} md={6} xs={12}>
              <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="Home" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Message message={`Er staan voor deze week geen wedstrijden gepland.`} />
      )}
    </Box>
  );
};

export default Program;
