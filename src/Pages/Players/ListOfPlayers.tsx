import { Box, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PlayersTable from '../../Components/Table/PlayersTable';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchAllPlayers } from '../../store/players/actions';
import { selectPlayers } from '../../store/players/selectors';
import { selectToken, selectUser } from '../../store/user/selectors';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
  playersTable: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
    marginTop: theme.spacing(6),
  },
}));

const ListOfPlayers: React.FC = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const players = useSelector(selectPlayers);
  const isLoading = useSelector(selectAppLoading);
  const user = useSelector(selectUser);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  useEffect(() => {
    if (!players) {
      dispatch(fetchAllPlayers());
    }
  }, [dispatch, players]);

  const editAdminStatus = () => setUpdate(!update);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text="Spelers" />

        {user && user.admin ? (
          <ButtonComponent caption={update ? 'KLAAR' : 'EDIT SPELER'} color="secondary" handleClick={editAdminStatus} />
        ) : null}
      </Grid>

      {isLoading ? (
        <ProgressLinear />
      ) : players ? (
        <Grid container justify="center">
          <Grid item xs={10} className={classes.playersTable}>
            <PlayersTable players={players} changeStatus={update} />
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default ListOfPlayers;
