import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import ScoresStackedChart from '../../Components/Chart/ScoresStackedChart';
import Message from '../../Components/Message';
import PageTitle from '../../Components/PageTitle';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchPlayerScores } from '../../store/players/actions';
import { selectPlayerScores } from '../../store/players/selectors';
import { selectToken } from '../../store/user/selectors';
import { divider, progress, subTitle, subTitleSection, title, topSection, waitMessage } from '../../ui/sharedClasses';
import { colorPrimary, colorSecondary } from '../../ui/theme/chartColors';

const useStyles = makeStyles((theme: Theme) => ({
  ...divider(theme),
  ...progress(),
  ...topSection(theme),
  ...subTitle(theme),
  ...subTitleSection(theme),
  ...title(theme),
  ...waitMessage(theme),
}));

const ScoresPlayer: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scoresPlayer = useSelector(selectPlayerScores);
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    dispatch(fetchPlayerScores(+id));
  }, [dispatch, id]);

  return isLoading ? (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.waitMessage}>
            Wacht op scores
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.progress}>
        <ProgressLinear />
      </Box>
    </Box>
  ) : scoresPlayer ? (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitle text={scoresPlayer.userName} />

        <Grid>
          <Grid>
            <Button
              fullWidth
              variant={btnVariant ? 'contained' : 'outlined'}
              size="small"
              color="secondary"
              disableElevation
              onClick={() => history.push(`/spelers/${id}/voorspellingen/1/1`)}
            >
              VOORSPELLINGEN
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {scoresPlayer ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.subTitleSection}>
            <Typography variant="h4" className={classes.subTitle}>
              TOTO RONDES
            </Typography>
          </Grid>

          <Grid className={classes.divider}>
            <Divider />
          </Grid>

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresStackedChart
                scoresPlayer={scoresPlayer}
                colorMain={colorSecondary}
                colorHover={colorPrimary}
                loggedInUser={false}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <Message message={`Nog geen scores`} />
      )}
    </Box>
  ) : (
    <></>
  );
};

export default ScoresPlayer;
