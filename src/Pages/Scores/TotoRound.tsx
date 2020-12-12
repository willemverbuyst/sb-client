import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchScoresTotoRound } from '../../store/scores/actions';
import { selectTotoRound } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';
import TotoRoundTable from '../../Components/Table/TotoRoundTable';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  table: {
    marginTop: theme.spacing(6),
  },
  totoRound: {
    marginBottom: theme.spacing(6),
  }
}));

export default function TotoRound() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totoRound = useSelector(selectTotoRound);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchScoresTotoRound(+id))
  }, [dispatch, id])
  
  return ( 
    <Box>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
          Scores
          </Typography>
        </Grid>
        <Grid>
          <Button
            variant="contained" 
            size="small" 
            color="secondary" 
            disableElevation 
            onClick={()=> history.goBack()}
          >
            TERUG
          </Button>
        </Grid>
      </Grid>

      {isLoading ? 
        <ProgressLinear colorSpinner="primary"/>
      :
      totoRound && totoRound.length > 0 ?
        <>
          <Grid 
            item xs={12} 
            container justify="center" 
            className={classes.totoRound}
          >
            <Typography variant="h4">
              TOTORONDE {id}
            </Typography>
          </Grid>
          <Divider/>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.table}
          >
          <Grid item xs={12} md={4} container justify="center">
            <TotoRoundTable totoRound={totoRound}/>
            </Grid>
          </Grid>
        </>
      : 
      <Grid>
        <Typography variant="overline">
          Nog geen scores voor totoronde {id}
        </Typography>
      </Grid> 
      }
    </Box>
  )
}