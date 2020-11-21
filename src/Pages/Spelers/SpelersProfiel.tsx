import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchPlayerProfile } from '../../store/players/actions';
import { selectPlayerProfile } from '../../store/players/selectors';
// import SpelersTable from '../../Components/Table/SpelersTable';
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
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

export default function SpelersProfiel() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const playerProfile = useSelector(selectPlayerProfile)

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchPlayerProfile(+id));
  }, [dispatch, id]);
  
  return (
    <>
      {playerProfile ? 
      <>
        <Typography variant="h3" className={classes.title}>
          {playerProfile.userName}
        </Typography>
        <img alt={playerProfile.team.name} src={playerProfile.team.logo} />
      </>
      :
        <Typography variant="h3" className={classes.title}>
          Spelers
        </Typography> 
      }
    </>        
  ) 
}
