import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ProgressLinear from '../../Components/Progress/ProgressLinear';
import PlayersTable from '../../Components/Table/PlayersTable';
import { selectAppLoading } from '../../store/appState/selectors';
import { fetchAllPlayers } from '../../store/players/actions';
import { selectPlayers } from '../../store/players/selectors';
import { selectToken, selectUser } from '../../store/user/selectors';
import { progress, title, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...progress(),
  ...topSection(theme),
  ...title(theme),
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
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

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
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Spelers
          </Typography>
        </Grid>

        {user && user.admin ? (
          <Grid>
            <Button
              fullWidth
              variant={btnVariant ? 'contained' : 'outlined'}
              size="small"
              color="secondary"
              disableElevation
              onClick={editAdminStatus}
            >
              {update ? 'KLAAR' : 'EDIT SPELER'}
            </Button>
          </Grid>
        ) : null}
      </Grid>

      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
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
