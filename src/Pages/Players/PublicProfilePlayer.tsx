import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchPlayerProfile } from '../../store/players/actions';
import { selectPlayerProfile } from '../../store/players/selectors';
import { 
  makeStyles, 
  createStyles, 
  Theme 
} from '@material-ui/core/styles';
import { 
  Box, 
  Divider, 
  Grid, 
  Typography 
} from '@material-ui/core';
import PublicMatchCard from '../../Components/Card/PublicMatchCard';
import PaginationComponent from '../../Components/Pagination';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';

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
    logo: {
      height: 50,
      marginLeft: 10,
    },
    progress: {
      minHeight: '70vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
  }),
);

export default function PublicProfilePlayer() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const playerProfile = useSelector(selectPlayerProfile)
  const isLoading = useSelector(selectAppLoading);
  const [totoRoundNumber, setTotoRoundNumber] = useState<number>(1);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchPlayerProfile(+id));
  }, [dispatch, id]);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    setTotoRoundNumber(value);
    setRoundNumber(1);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value:number) => {
    setRoundNumber(value);
  };
  
  return (
    isLoading ?
    <Grid container>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Wacht op profiel
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.progress}>
        <ProgressLinear/> 
      </Box>
    </Grid>
    : playerProfile ?
      <Grid container>
        <Grid container>
          <Grid>
            <Typography variant="h3" className={classes.title}>
              {playerProfile.userName}
            </Typography>
          </Grid>
          <Grid>
            <img 
            alt={playerProfile.team.name} 
            src={playerProfile.team.logo} 
            className={classes.logo}/> 
          </Grid>
        </Grid>

        <Divider/>

        { playerProfile && playerProfile.pastFixturesWithScores ?
          <>
            <Grid item xs={12} container justify="center">
              { playerProfile.pastFixturesWithScores ? [...playerProfile.pastFixturesWithScores[totoRoundNumber-1][roundNumber -1]]
                .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
                .map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}>
                  <PublicMatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>) 
              : null }
            </Grid>
            <PaginationComponent 
              label="Totoronde"
              page={totoRoundNumber}
              count={playerProfile.pastFixturesWithScores.length}
              color="primary"
              onChange={handleChangeTotoRounds}
            /> 
            <PaginationComponent 
              label="Speelronde"
              page={roundNumber}
              count={playerProfile.pastFixturesWithScores[totoRoundNumber -1].length} 
              color="secondary" 
              onChange={handleChangeRounds}
            /> 
          </>
        : null }
      </Grid> 
    :null 
  ) 
}
