import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken, selectUser } from '../../store/user/selectors';
import { fetchAllPlayers } from '../../store/players/actions';
import { selectPlayers } from '../../store/players/selectors';
import PlayersTable from '../../Components/Table/PlayersTable';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  Grid, 
  Typography 
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  const user = useSelector(selectUser);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!players) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, players]);

  const editAdminStatus  = () => setUpdate(!update)
  
  return (
    <Box>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Spelers
          </Typography>
        </Grid>

        { user && user.admin ?
        <Grid>
          <Button
            fullWidth
            variant="contained" 
            size="small" 
            color="secondary" 
            disableElevation 
            onClick={editAdminStatus}
          >
            { update ? 'KLAAR' : 'EDIT SPELER' }
          </Button>
        </Grid>
        : null }
      </Grid>

        { isLoading ?
          <Box className={classes.progress}>
            <ProgressLinear/> 
          </Box>
        : players ? 
          <Grid container justify="center"> 
            <Grid item xs={10} className={classes.playersTable}>
              <PlayersTable players={players} changeStatus={update}/>
            </Grid> 
          </Grid>
        : null }

    </Box>      
  ) 
}
