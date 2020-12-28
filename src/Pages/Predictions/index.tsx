import React, { ReactElement, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFixtures } from '../../store/predictions/actions';
import { selectFixtures } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Grid, Theme, Typography } from '@material-ui/core';
import MatchCard from '../../Components/Card/MatchCard';
import PaginationComponent from '../../Components/Pagination';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';
import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../constants/setupGame';
import { calculateIndex, roundByTotoRound, totoRoundByRound } from '../../utils/parameterFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  topSection: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    justifyContent: 'space-between',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
      fontSize: '2.5rem',
    },
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
  pagination: {
    padding: theme.spacing(2),
  },
  progress: {
    width: '100%',
  },
}));

const Predictions: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const fixtures = useSelector(selectFixtures);
  const { totoronde } = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  let t = +totoronde;
  let r = +ronde;
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!fixtures) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixtures]);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    r = roundByTotoRound(value);
    history.push(`/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    t = totoRoundByRound(value);

    history.push(`/voorspellingen/${t}/${value}`);
  };

  const gotoRanking = () => history.push(`/klassement/ronde/${r}`);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Voorspellingen
          </Typography>
        </Grid>
        {fixtures ? (
          <Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained"
                size="small"
                color="secondary"
                disableElevation
                onClick={gotoRanking}
              >
                KLASSEMENT
              </Button>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : fixtures ? (
        <>
          <Grid item xs={12} container justify="center">
            {fixtures
              ? [...fixtures[t - 1][calculateIndex(r)]]
                  .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
                  .map((wedstrijd, i) => (
                    <Grid item key={i} lg={4} md={6} xs={12}>
                      <MatchCard wedstrijdMetVoorspellingen={wedstrijd} display="Predictions" />
                    </Grid>
                  ))
              : null}
          </Grid>
          <PaginationComponent
            label="Totoronde"
            page={t}
            count={TOTO_ROUNDS}
            color="primary"
            onChange={handleChangeTotoRounds}
          />
          <PaginationComponent
            label="Speelronde"
            page={r}
            count={TOTAL_ROUNDS}
            color="secondary"
            onChange={handleChangeRounds}
          />
        </>
      ) : null}
    </Box>
  );
};

export default Predictions;
