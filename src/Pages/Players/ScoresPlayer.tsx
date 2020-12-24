import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
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

export default function ScoresPlayer() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);
  const scores = useSelector(selectScores);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) history.push("/login");
  });

  console.log(scores)

  useEffect(() => {
    //  adjust logic to prevent refetching
    dispatch(fetchUserScores(+id));
  }, [dispatch, id]);

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
              VOORSPELLINGEN
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
              TOTO RONDES
            </Typography>
          </Grid>

          <Grid className={classes.divider}>
            <Divider/>
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
            Nog geen scores
          </Typography>
        </Grid> 
      }
    </Box>
  )
}
