import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchCurrentRound } from '../../store/predictions/actions';
import { selectCurrentRound } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import MatchCard from '../../Components/Card/MatchCard';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Theme, Typography } from '@material-ui/core';
import { content, message, progress, title, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...message(theme),
  ...progress(),
  ...topSection(theme),
  ...title(theme),
  ...content(theme),
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
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Programma
          </Typography>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : currentRound ? (
        <Grid item xs={12} container justify="center">
          {currentRound.fixtures.map((wedstrijd, i) => (
            <Grid item key={i} lg={4} md={6} xs={12}>
              <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="Home" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container className={classes.message}>
          <Typography variant="overline">Er staan voor deze week geen wedstrijden gepland.</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default Program;
