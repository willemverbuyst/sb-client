import React, { ReactElement, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchScoresTotoRound } from '../../store/scores/actions';
import { selectTotoRound } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Breadcrumbs, Divider, Grid, Typography, Theme } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import { UserWithScore } from '../../store/scores/types';
import RoundSelector from '../../Components/Selector/RoundSelector';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {
  breadCrumbs,
  divider,
  message,
  progress,
  subTitle,
  subTitleSection,
  title,
  topSection,
} from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...divider(theme),
  ...message(theme),
  ...progress(),
  ...topSection(theme),
  ...title(theme),
  ...subTitle(theme),
  ...subTitleSection(theme),
  ...breadCrumbs(theme),
}));

const TotoRound: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totoRound = useSelector(selectTotoRound);
  const isLoading = useSelector(selectAppLoading);
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!totoRound || (totoRound && +id !== +totoRound.id)) {
      dispatch(fetchScoresTotoRound(+id));
    }
  }, [dispatch, id, totoRound]);

  const totoRoundSortedByUserName: UserWithScore[] =
    totoRound && totoRound.usersWithScores
      ? [...totoRound.usersWithScores].sort((name1, name2) =>
          name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()),
        )
      : [];

  const gotoTotoRound = () => history.push(`/voorspellingen/${id}/${+id * 3 - 2}`);

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
            onClick={gotoTotoRound}
          >
            MIJN VOORSPELLINGEN
          </Button>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : totoRound && totoRound.usersWithScores && totoRound.usersWithScores.length > 0 ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.subTitleSection}>
            <Typography variant="h4" className={classes.subTitle}>
              TOTO RONDE {id}
            </Typography>
          </Grid>

          <Divider className={classes.divider} />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totoRoundSortedByUserName} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid>
          <Typography variant="overline" className={classes.message}>
            Nog geen scores voor toto ronde {id}
          </Typography>
        </Grid>
      )}
      <Grid container justify="center" className={classes.breadCrumbs}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Button color="primary" onClick={() => history.push('/klassement/totaaltoto')}>
            Totaal Toto
          </Button>
          <Button color="primary" disabled>
            Toto Ronde {id}
          </Button>
          <RoundSelector />
        </Breadcrumbs>
      </Grid>
    </Box>
  );
};

export default TotoRound;
