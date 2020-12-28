import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { fetchPlayerScores } from '../../store/players/actions';
import { selectPlayerScores } from '../../store/players/selectors';
import ScoresStackedChart from '../../Components/Chart/ScoresStackedChart';
import { colorPrimary, colorSecondary } from '../../ui/theme/chartColors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  topSection: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
    justifyContent: 'space-between',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: '2.5rem',
    },
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  subTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      opacity: '0.7',
    },
  },
  totoRound: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
    marginBottom: theme.spacing(6),
  },
  divider: {
    [theme.breakpoints.down('sm')]: {
      visibility: 'hidden',
    },
    marginBottom: theme.spacing(6),
  },
  progress: {
    width: '100%',
  },
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
          <Grid item xs={12} container justify="center" className={classes.totoRound}>
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
        <Grid>
          <Typography variant="overline">Je hebt nog geen scores</Typography>
        </Grid>
      )}
    </Box>
  );
};

export default ScoresUser;
