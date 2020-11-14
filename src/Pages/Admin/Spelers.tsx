import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchAllPlayers } from '../../store/admin/actions';
import { selectPlayers } from '../../store/admin/selectors';
import PlayerCard from '../../Components/PlayerCard';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

export default function Spelers() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch()
  const players = useSelector(selectPlayers)

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  });

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);
  
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {players && players.map((player, i) => (
            <PlayerCard key={i} player={player}/>
          ))}
        </Grid>
      </Grid>
    </Grid>
  ) 
}
