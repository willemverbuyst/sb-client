import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectScores, selectToken } from '../../store/user/selectors'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  Divider, 
  Grid, 
  Typography 
} from '@material-ui/core';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { fetchUserScores } from '../../store/user/actions';
import ScoresStackedChart from '../../Components/Chart/ScoresStackedChart';

const useStyles = makeStyles((theme: Theme) => ({
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
  btn: {
    marginTop: theme.spacing(1)
  }
 }));

export default function ScoresUser() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scores = useSelector(selectScores);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!scores) {
      dispatch(fetchUserScores());
    }
  });

  return (
    <Box>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Scores
          </Typography>
        </Grid>
        <Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained" 
                size="small" 
                color="primary" 
                disableElevation 
                onClick={()=> history.push(`/voorspellingen/1/1`)}
              >
                MIJN VOORSPELLINGEN
              </Button>
            </Grid>
            <Grid className={classes.btn}>
              <Button
                fullWidth
                variant="contained" 
                size="small" 
                color="secondary" 
                disableElevation 
                onClick={()=> history.push(`/scores/totaaltoto`)}
              >
                ALLE SCORES
              </Button>
            </Grid>
          </Grid>
      </Grid>

      { isLoading ?
          <Box className={classes.progress}>
            <ProgressLinear/> 
          </Box>
      : scores ? 
        <>
          <Grid 
            item xs={12} 
            container justify="center" 
            className={classes.totoRound}
          >
            <Typography variant="h4">
              MIJN SCORES 
            </Typography>
          </Grid>

          <Grid>
            <Divider className={classes.divider}/>
          </Grid>
          
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} container justify="center">
              <ScoresStackedChart userScores={scores}/>
            </Grid>
          </Grid>
        </>  
      : 
        <Grid>
          <Typography variant="overline">
            Je hebt nog geen scores
          </Typography>
        </Grid> 
      }
    </Box>
  )
}
