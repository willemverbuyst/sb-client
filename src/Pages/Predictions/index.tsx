import { Box, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import MatchCard from '../../Components/Card/MatchCard';
import PaginationComponent from '../../Components/Pagination';
import ProgressComponent from '../../Components/Progress';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../constants/setupGame';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchAllFixtures } from '../../store/predictions/actions';
import { selectFixtures } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import { content, pagination, progress, topSection } from '../../ui/sharedClasses';
import { calculateIndex, roundByTotoRound, totoRoundByRound } from '../../utils/parameterFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...progress(),
  ...topSection(theme),
  ...content(theme),
  ...pagination(theme),
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
        <PageTitleComponent text="Voorspellingen" />
        {fixtures ? <ButtonComponent caption="KLASSEMENT" color="secondary" handleClick={gotoRanking} /> : null}
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressComponent />
        </Box>
      ) : fixtures ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.content}>
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
          <Grid className={classes.pagination}>
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
          </Grid>
        </>
      ) : null}
    </Box>
  );
};

export default Predictions;
