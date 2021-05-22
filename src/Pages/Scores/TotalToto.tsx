import { Box, Breadcrumbs, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import ScoresBarChart from '../../Components/Chart/ScoresBarChart';
import DividerComponent from '../../Components/Divider';
import Message from '../../Components/Message';
import ProgressComponent from '../../Components/Progress';
import TotoRoundSelector from '../../Components/Selector/TotoRoundSelector';
import PageTitleComponent from '../../Components/Title/PageTitle';
import SubTitleComponent from '../../Components/Title/SubTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchScoresTotalToto } from '../../store/scores/actions';
import { selectTotalToto } from '../../store/scores/selectors';
import { UserWithScore } from '../../store/scores/types';
import { selectToken } from '../../store/user/selectors';
import { breadCrumbs, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
  ...breadCrumbs(theme),
}));

const TotalToto: React.FC = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();
  const totalToto = useSelector(selectTotalToto);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!totalToto) {
      dispatch(fetchScoresTotalToto());
    }
  }, [dispatch, totalToto]);

  const totalTotoSortedByUserName: UserWithScore[] = totalToto
    ? [...totalToto].sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()))
    : [];

  const gotoTotoRound = () => history.push(`/voorspellingen/1/1`);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text="Klassement" />
        <ButtonComponent caption="MIJN VOORSPELLINGEN" color="primary" handleClick={gotoTotoRound} />
      </Grid>

      {isLoading ? (
        <ProgressComponent />
      ) : totalToto && totalToto.length > 0 ? (
        <>
          <SubTitleComponent text="TOTAAL TOTO" />
          <DividerComponent />

          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={12} md={6} container justify="center">
              <ScoresBarChart scores={totalTotoSortedByUserName} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Message message={`Nog geen scores voor totalToto`} />
      )}
      <Grid container justify="center" className={classes.breadCrumbs}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Button color="primary" disabled>
            Totaal Toto
          </Button>
          <TotoRoundSelector />
          <Button color="primary" disabled>
            Ronde
          </Button>
        </Breadcrumbs>
      </Grid>
    </Box>
  );
};

export default TotalToto;
