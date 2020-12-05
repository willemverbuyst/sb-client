import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchScoresTotoRound } from '../../store/scores/actions';
import { selectTotoRound } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';
import TotoRoundTable from '../../Components/Table/TotoRoundTable';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  },
  table: {
    marginTop: theme.spacing(6),
  },
}));

export default function TotoRound() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totoRound = useSelector(selectTotoRound);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchScoresTotoRound(+id))
  }, [dispatch, id])
  
  console.log(totoRound)

  return ( 
    <Box>
      <Typography variant="h3" className={classes.title}>
        Scores toto-ronde
      </Typography>

      <Divider/>

      { totoRound ?
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.table}
        >
        <Grid item xs={12} md={6} container justify="center">
          <TotoRoundTable totoRound={totoRound}/>
          </Grid>
        </Grid>
      : null }
    </Box>
  )
}