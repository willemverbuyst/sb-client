import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchScoresTotalToto } from '../../store/scores/actions';
import { selectTotalToto } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import { UserWithScore } from '../../store/scores/types';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  barChart: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(6),
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

  const totalTotoSortedByName: UserWithScore[]= totalToto ? [...totalToto]
    .sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase())) : [];
 
  return ( 
    <Box>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Scores
          </Typography>
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

          <Divider/>
          
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.barChart}
          >
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totalTotoSortedByName}/>
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
    </Box>
  )
}