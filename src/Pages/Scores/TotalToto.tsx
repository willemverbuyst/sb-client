import React, { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchScoresTotalToto } from '../../store/scores/actions';
import { selectTotalToto } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Breadcrumbs, Button, Divider, Grid, Theme, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import { UserWithScore } from '../../store/scores/types';
import TotoRoundSelector from '../../Components/Selector/TotoRoundSelector';

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
  selector: {
    marginTop: theme.spacing(6),
  },
  breadCrumbs: {
    marginTop: theme.spacing(6),
  },
}));

const TotalToto: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totalToto = useSelector(selectTotalToto);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!totalToto) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, totalToto]);

  const totalTotoSortedByUserName: UserWithScore[] = totalToto
    ? [...totalToto].sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()))
    : [];

  const gotoTotoRound = () => history.push(`/voorspellingen/1/1`);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Klassement
          </Typography>
        </Grid>
        <Grid>
          <Button variant="contained" size="small" color="primary" disableElevation onClick={gotoTotoRound}>
            MIJN VOORSPELLINGEN
          </Button>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : totalToto && totalToto.length > 0 ? (
        <>
          <Grid item xs={12} container justify="center" className={classes.totoRound}>
            <Typography variant="h4" className={classes.subTitle}>
              TOTAAL TOTO
            </Typography>
          </Grid>

          <Divider className={classes.divider} />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totalTotoSortedByUserName} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid>
          <Typography variant="overline">Nog geen scores voor totalToto</Typography>
        </Grid>
      )}
      <Grid container justify="center" className={classes.breadCrumbs}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Button color="primary" disabled>
            Totaal Toto
          </Button>
          <TotoRoundSelector />
          <Button color="primary" disabled>
            Ronde
          </Button>
        </Breadcrumbs>
      </Grid>
    </Box>
  );
};

export default TotalToto;
