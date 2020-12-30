import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import Message from '../../Components/Message';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ScoresStackedChart from '../../Components/Chart/ScoresStackedChart';
import { fetchPlayerScores } from '../../store/players/actions';
import { selectPlayerScores } from '../../store/players/selectors';
import { colorPrimary, colorSecondary } from '../../ui/theme/chartColors';
import { divider, progress, subTitle, subTitleSection, title, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...divider(theme),
  ...progress(),
  ...topSection(theme),
  ...title(theme),
  ...subTitle(theme),
  ...subTitleSection(theme),
}));

const ScoresUser: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);
  const scoresPlayer = useSelector(selectPlayerScores);
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

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
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Scores
          </Typography>
        </Grid>

        {isLoading ? null : (
          <Grid>
            <Grid>
              <Button
                fullWidth
                variant={btnVariant ? 'contained' : 'outlined'}
                size="small"
                color="primary"
                disableElevation
                onClick={() => history.push(`/voorspellingen/1/1`)}
              >
                VOORSPELLINGEN
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : scoresPlayer ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.subTitleSection}>
            <Typography variant="h4" className={classes.subTitle}>
              MIJN TOTO RONDES
            </Typography>
          </Grid>

          <Grid className={classes.divider}>
            <Divider />
          </Grid>

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
