import { Box, Grid, Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import SignUpForm from '../../Components/Form/SingUpForm';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';
import { selectUser } from '../../store/user/selectors';
import { progress, title, topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...progress(),
  ...topSection(theme),
  ...title(theme),
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
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Sign Up
          </Typography>
        </Grid>

        {isLoading ? (
          <Box className={classes.progress}>
            <ProgressLinear />
          </Box>
        ) : (
          <SignUpForm />
        )}
      </Grid>
    </Box>
  );
};

export default SignUp;
