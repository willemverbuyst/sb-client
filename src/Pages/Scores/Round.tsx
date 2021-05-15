import { Box, Breadcrumbs, Button, Divider, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import Message from '../../Components/Message';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { TOTAL_ROUNDS } from '../../constants/setupGame';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchScoresRound } from '../../store/scores/actions';
import { selectRound } from '../../store/scores/selectors';
import { UserWithScore } from '../../store/scores/types';
import { selectToken } from '../../store/user/selectors';
import { breadCrumbs, divider, progress, subTitle, subTitleSection, title, topSection } from '../../ui/sharedClasses';
import { sortValues } from '../../utils/sortFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...divider(theme),
  ...divider(theme),
  ...progress(),
  ...topSection(theme),
  ...title(theme),
  ...subTitle(theme),
  ...subTitleSection(theme),
  ...breadCrumbs(theme),
}));

const Round: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const round = useSelector(selectRound);
  const isLoading = useSelector(selectAppLoading);
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!round || (round && +id !== +round.id)) {
      dispatch(fetchScoresRound(+id));
    }
  }, [dispatch, id, round]);

  const roundSortedByName: UserWithScore[] =
    round && round.usersWithScores ? sortValues<UserWithScore>(round.usersWithScores) : [];

  const gotoPredictions = () => {
    const t = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/voorspellingen/${t}/${+id}`);
  };

  const gotoTotalToto = () => history.push('/klassement/totaaltoto');

  const gotoTotoRound = () => {
    const tr = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/klassement/totoronde/${tr}`);
  };

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Klassement
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant={btnVariant ? 'contained' : 'outlined'}
            size="small"
            color="primary"
            disableElevation
            onClick={gotoPredictions}
          >
            MIJN VOORSPELLINGEN
          </Button>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : round && round.usersWithScores && round.usersWithScores.length > 0 ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.subTitleSection}>
            <Typography variant="h4" className={classes.subTitle}>
              RONDE {id}
            </Typography>
          </Grid>

          <Divider className={classes.divider} />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={roundSortedByName} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Message message={`Nog geen scores voor deze ronde`} />
      )}

      <Grid container justify="center" className={classes.breadCrumbs}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Button color="primary" onClick={gotoTotalToto}>
            Totaal Toto
          </Button>
          <Button color="primary" onClick={gotoTotoRound}>
            Totoronde {+id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1}
          </Button>
          <Button color="primary" disabled>
            Ronde {id}
          </Button>
        </Breadcrumbs>
      </Grid>
    </Box>
  );
};

export default Round;
