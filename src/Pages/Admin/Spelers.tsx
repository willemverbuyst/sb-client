import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchAllPlayers } from '../../store/admin/actions';
import { selectPlayers } from '../../store/admin/selectors';
import { selectUser } from '../../store/user/selectors';
import PlayerCard from '../../Components/PlayerCard';
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
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
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const players = useSelector(selectPlayers)

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (user && !user.admin) history.push("/page-not-found");
  })

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);
  
  return (
    <>
      <Typography variant="h2" className={classes.title}>
          Spelers
      </Typography>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={spacing}>
            {players && players.map((player, i) => (
              <PlayerCard key={i} player={player}/>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>        
  ) 
}
