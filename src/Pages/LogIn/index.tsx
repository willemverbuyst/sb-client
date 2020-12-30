import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import LogInForm from '../../Components/Form/LogInForm';
import ProgressLinear from '../../Components/Progress/ProgressLinear';
import { selectAppLoading } from '../../store/appState/selectors';
import { selectToken } from '../../store/user/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  progress: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '60vh',
    },
    backgroundColor: '#f1f1f1',
    minHeight: 'calc(100vh - 8.6rem)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const LogIn: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    if (token) history.push('/programma');
  }, [token, history]);

  return (
    <Box>
      {isLoading ? (
        <Box className={classes.progress}>
          <ProgressLinear />
        </Box>
      ) : (
        <LogInForm />
      )}
    </Box>
  );
};

export default LogIn;
