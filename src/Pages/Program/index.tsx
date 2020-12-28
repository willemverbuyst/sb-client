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

const useStyles = makeStyles((theme: Theme) => ({
  topSection: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
  subTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  progress: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
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
