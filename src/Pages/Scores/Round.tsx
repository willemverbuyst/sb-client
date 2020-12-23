import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import  { fetchScoresRound } from '../../store/scores/actions';
import { selectRound } from '../../store/scores/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box, 
  Breadcrumbs,
  Button,
  Divider,
  Grid, 
  Typography 
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { selectAppLoading } from '../../store/appState/selectors';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import { UserWithScore } from '../../store/scores/types';
import { TOTAL_ROUNDS } from '../../constants/setupGame';

const useStyles = makeStyles((theme) => ({
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
  breadCrumbs: {
    marginTop: theme.spacing(6),
  }
}));

export default function Round() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const round = useSelector(selectRound);
  const isLoading = useSelector(selectAppLoading);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!round || (round && +id !== +round.id)) {
      dispatch(fetchScoresRound(+id))
    }
  }, [dispatch, id, round])

  const roundSortedByName: UserWithScore[]= round && round.usersWithScores ? [...round.usersWithScores]
    .sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase())) : [];

  const gotoTotoRound = () => {  
    const t = +id !== TOTAL_ROUNDS
      ? Math.floor((+id - 1)/ 3) + 1 
      : Math.floor((+id - 2)/ 3) + 1 

    history.push(`/voorspellingen/${t}/${+id}`);
  }

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
            onClick={gotoTotoRound}
          >
            MIJN VOORSPELLINGEN
          </Button>
        </Grid>
      </Grid>

      {isLoading ? 
        <Box className={classes.progress}>
          <ProgressLinear/> 
        </Box>
      :
      round && round.usersWithScores && round.usersWithScores.length > 0 ?
        <>
          <Grid 
            item xs={12} 
            container justify="center" 
            className={classes.totoRound}
          >
            <Typography variant="h4">
              RONDE {id}
            </Typography>
          </Grid>

          <Divider className={classes.divider}/>
          
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={roundSortedByName}/>
            </Grid>
          </Grid>
        </>
      : 
      <Grid>
        <Typography variant="overline">
          Nog geen scores voor deze ronde
        </Typography>
      </Grid> 
      }
      
      <Grid 
        container 
        justify="center" 
        className={classes.breadCrumbs}
      >
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"
        >
          <Button
            color="primary"
            onClick={()=> history.push('/scores/totaaltoto')}
          >
            Totaal Toto
          </Button>
          <Button 
            color="primary"
            onClick={()=> history.goBack()}
          >
            Totoronde { +id !== 34
              ? Math.floor((+id - 1)/ 3) + 1 
              : Math.floor((+id - 2)/ 3) + 1 
              }
          </Button>
          <Button color="primary" disabled>Ronde {id}</Button>
        </Breadcrumbs>
      </Grid>
    </Box>
  )
}




