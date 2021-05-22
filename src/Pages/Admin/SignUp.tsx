import { Box, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignUpForm from '../../Components/Form/SingUpForm';
import ProgressComponent from '../../Components/Progress';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import { selectUser } from '../../store/user/selectors';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const SignUp: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAppLoading);
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push('/login');
  }, [token]);

  useEffect(() => {
    if (user && !user.admin) history.push('/page-not-found');
  });

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitleComponent text="Sign Up" />
      </Grid>
      {isLoading ? <ProgressComponent /> : <SignUpForm />}
    </Box>
  );
};

export default SignUp;
