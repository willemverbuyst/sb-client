import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectToken } from '../../store/user/selectors';

const CheckLoginStatus: React.FC = (): ReactElement => {
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  return <Box></Box>;
};

export default CheckLoginStatus;
