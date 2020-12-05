import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchAllPlayers } from '../../store/players/actions';
import { selectPlayers } from '../../store/players/selectors';
import SpelersTable from '../../Components/Table/SpelersTable';
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

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
    }
  }),
);

export default function Spelers() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const players = useSelector(selectPlayers)

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchAllPlayers);
  }, [dispatch]);
  
  return (
    <>
      <Typography variant="h3" className={classes.title}>
        Spelers
      </Typography>
      <Grid item xs={12} container justify="center"> 
        {players ? <Grid item xs={10}><SpelersTable players={players} /></Grid> : null }
      </Grid>
    </>        
  ) 
}
