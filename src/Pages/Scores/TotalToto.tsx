import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchScoresTotalToto } from '../../store/scores/actions';
import { selectTotalToto } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Breadcrumbs,
  Button,
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import { UserWithScore } from '../../store/scores/types';
import TotoRoundSelector from '../../Components/Selector/TotoRoundSelector';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  divider: {
    marginBottom: theme.spacing(6),
  },
  totoRound: {
    marginBottom: theme.spacing(6),
  },
  progress: {
    minHeight: '70vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selector: {
    marginTop: theme.spacing(6),
  },
  breadCrumbs: {
    marginTop: theme.spacing(6),
  }
}));

export default function TotalToto() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totalToto = useSelector(selectTotalToto);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!totalToto) {
      dispatch(fetchScoresTotalToto())
    }
  }, [dispatch, totalToto])

  const totalTotoSortedByUserName: UserWithScore[]= totalToto ? [...totalToto]
    .sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase())) : [];

  const gotoTotoRound = () => 
    history.push(`/voorspellingen/1/1`);
 
  return ( 
    <Box>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
           Klassement
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained" 
            size="small" 
            color="primary" 
            disableElevation 
            onClick={gotoTotoRound}
          >
            MIJN VOORSPELLINGEN
          </Button>
        </Grid>
      </Grid>

      {isLoading ? 
        <Box className={classes.progress}>
          <ProgressLinear/> 
        </Box>
      :
      totalToto && totalToto.length > 0 ?
        <>
          <Grid 
            item xs={12} 
            container justify="center" 
            className={classes.totoRound}
          >
            <Typography variant="h4">
              TOTAAL TOTO
            </Typography>
          </Grid>

          <Divider className={classes.divider}/>
          
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totalTotoSortedByUserName}/>
            </Grid>
          </Grid>
        </>
      : 
      <Grid>
        <Typography variant="overline">
          Nog geen scores voor totalToto
        </Typography>
      </Grid> 
      }
      <Grid 
        container 
        justify="center" 
        className={classes.breadCrumbs}
      >
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"
        >
          <Button
            color="primary"
            disabled
          >
            Totaal Toto
          </Button>
          <TotoRoundSelector/>
          <Button color="primary" disabled>Ronde</Button>
        </Breadcrumbs>
      </Grid>
    </Box>
  )
}