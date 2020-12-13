import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import { fetchAllPlayers } from '../../store/players/actions';
import { selectPlayers } from '../../store/players/selectors';
import PlayersTable from '../../Components/Table/PlayersTable';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.secondary.main
    },
    progress: {
      minHeight: '70vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    playersTable: {
      marginTop: theme.spacing(6),
    },
  }),
);

export default function ListOfPlayers() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const players = useSelector(selectPlayers);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!players) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, players]);
  
  return (
    <>
      <Typography variant="h3" className={classes.title}>
        Spelers
      </Typography>
      <Grid item xs={12} container justify="center"> 
      { isLoading ?
        <Box className={classes.progress}>
          <ProgressLinear/> 
        </Box>
      : players ? 
        <Grid item xs={10} className={classes.playersTable}>
          <PlayersTable players={players} />
        </Grid> 
      : null }
      </Grid>
    </>        
  ) 
}
