import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchPlayerProfile } from '../../store/players/actions';
import { selectPlayerProfile } from '../../store/players/selectors';
import { 
  createStyles, 
  makeStyles, 
  Theme 
} from '@material-ui/core/styles';
import { 
  Box, 
  Button, 
  Grid, 
  Typography 
} from '@material-ui/core';
import MatchCard from '../../Components/Card/MatchCard';
import PaginationComponent from '../../Components/Pagination';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';
import { TOTAL_ROUNDS } from '../../constants/setupGame';

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
      marginBottom: theme.spacing(3),
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

export default function PredictionsPlayer() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch()
  const token = useSelector(selectToken);
  const playerProfile = useSelector(selectPlayerProfile)
  const isLoading = useSelector(selectAppLoading);
  const { totoronde} = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  let t = +totoronde;
  let r = +ronde;

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchPlayerProfile(+id));
  }, [dispatch, id]);

  const gotoScores = () => history.push(`/spelers/${id}/scores`);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    r = value * 3 - 2;
    history.push(`/spelers/${id}/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value:number) => {
    t = value !== TOTAL_ROUNDS 
      ? Math.floor((value - 1)/ 3) + 1 
      : Math.floor((value - 2)/ 3) + 1 

    history.push(`/spelers/${id}/voorspellingen/${t}/${value}`);
  };

  return (
    isLoading ?
    <Box>
      <Grid container >
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Wacht op voorspellingen
          </Typography>
        </Grid>
      </Grid>
      <Box className={classes.progress}>
        <ProgressLinear/> 
      </Box>
    </Box>
    : playerProfile ?
      <Box>
        <Grid container justify="space-between">
          <Grid>
            <Typography variant="h3" className={classes.title}>
              {playerProfile.userName}
            </Typography>
          </Grid>
          <Grid>
            <Button
              fullWidth
              variant="contained" 
              size="small" 
              color="secondary" 
              disableElevation 
              onClick={gotoScores}
            >
              SCORES
            </Button>
          </Grid>
        </Grid>

        { playerProfile && playerProfile.pastFixturesWithScores ?
          <>
            <Grid item xs={12} container justify="center">
              { playerProfile.pastFixturesWithScores ? [...playerProfile.pastFixturesWithScores[t-1][r !== TOTAL_ROUNDS ? (r + 2) % 3 : (r % 3) + 2 ]]
                .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
                .map((wedstrijd, i) => 
                  <Grid item key={i} lg={4} md={6} xs={12}>
                    <MatchCard 
                      wedstrijdMetVoorspellingen={wedstrijd} 
                      display="public"
                    />
                  </Grid>) 
              : null }
            </Grid>
            <PaginationComponent 
              label="Totoronde"
              page={t}
              count={playerProfile.pastFixturesWithScores.length}
              color="primary"
              onChange={handleChangeTotoRounds}
            /> 
            <PaginationComponent 
              label="Speelronde"
              page={r}
              count={playerProfile.pastFixturesWithScores.flat().length} 
              color="secondary" 
              onChange={handleChangeRounds}
            /> 
          </>
        : null }
      </Box> 
    :null 
  ) 
}
