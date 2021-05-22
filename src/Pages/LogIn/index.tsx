import { Box, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LogInForm from '../../Components/Form/LogInForm';
import ProgressComponent from '../../Components/Progress';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const LogIn: React.FC = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const token = useSelector(selectToken);
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text="Login" />
      </Grid>
      {isLoading ? <ProgressComponent /> : <LogInForm />}
    </Box>
  );
};

export default LogIn;
