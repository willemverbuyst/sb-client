import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import TopThreeTable from '../../Components/Table/TopThreeTable';
import MatchCard from '../../Components/PlayerCard/MatchCard';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, Typography 
} from '@material-ui/core';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { fetchCurrentRound } from '../../store/voorspellingen/actions';
import { selectCurrentRound } from '../../store/voorspellingen/selectors';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  }
}));

export default function HomePage() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const round = useSelector(selectCurrentRound);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchCurrentRound())
  });

  console.log(round)

  return (
    token ? (  
      <Box>
        <Typography variant="h2" className={classes.title}>
          Home
        </Typography>
        {/* <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid><TopThreeTable /></Grid>
          <Grid><TopThreeTable /></Grid>
        </Grid> */}
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {round ? round.map((wedstrijd, i) => <MatchCard key={i} wedstrijdMetVoorspellingen={wedstrijd}/>) : null }
          </Grid>
        </Grid>
      </Box>
    ) : ( null )
  )
}
