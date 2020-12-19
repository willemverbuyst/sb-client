import React, { useEffect } from 'react';
import { useHistory , useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFixtures } from '../../store/predictions/actions';
import { selectFixtures } from '../../store/predictions/selectors';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(3),
    color: theme.palette.secondary.main
  },
  subTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main
  },
  pagination: {
    padding: theme.spacing(2)
  },
  progress: {
    minHeight: '70vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function Predictions() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const fixtures = useSelector(selectFixtures)
  const { totoronde} = useParams<{ totoronde: string }>();
  const { ronde } = useParams<{ ronde: string }>();
  const t = +totoronde;
  let r = +ronde;
  const isLoading = useSelector(selectAppLoading);
  
  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    if (!fixtures) {
      dispatch(fetchAllFixtures());
    }
  }, [dispatch, fixtures]);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    r = 1;
    history.push(`/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value:number) => {
    history.push(`/voorspellingen/${t}/${value}`);
  };

  return (
    <Grid container>
      <Grid container justify="space-between">
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Mijn voorspellingen
          </Typography>
        </Grid>
        { fixtures ?
          <Grid>
            <Button
              variant="contained" 
              size="small" 
              color="secondary" 
              disableElevation 
              onClick={()=> history.push(`/scores/totoronde/${t}`)}
            >
              SCORES TOTORONDE: {t}
            </Button>
          </Grid>
        :
          null
        }
      </Grid>

      { isLoading ?
        <Box className={classes.progress}>
          <ProgressLinear/> 
        </Box>
      : fixtures ?
        <>
          <Grid item xs={12} container justify="center">
            { fixtures ? [...fixtures[t-1][r -1]]
              .sort((f1, f2) => f1.eventTimeStamp - f2.eventTimeStamp)
              .map((wedstrijd, i) => <Grid item key={i} lg={4} md={6} xs={12}>
                <MatchCard wedstrijdMetVoorspellingen={wedstrijd}/></Grid>) 
            : null }
          </Grid>
          <PaginationComponent 
            label="Totoronde"
            page={t}
            count={fixtures.length}
            color="primary"
            onChange={handleChangeTotoRounds}
          /> 
          <PaginationComponent 
            label="Speelronde"
            page={r}
            count={fixtures[t -1].length} 
            color="secondary" 
            onChange={handleChangeRounds}
          /> 
        </>
      : null }
    </Grid>
  )
}

