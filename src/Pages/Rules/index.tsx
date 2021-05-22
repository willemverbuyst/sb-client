import { Box } from '@material-ui/core';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectToken } from '../../store/user/selectors';
import AccordionWithRules from './AccordionWithRules';
import TopSection from './TopSection';

const Rules: React.FC = (): ReactElement => {
  const history = useHistory();
  const token = useSelector(selectToken);

  useEffect(() => {
    if (!token) history.push('/login');
  });

  return (
    <Box>
      <TopSection />
      <AccordionWithRules />
    </Box>
  );
};

export default Rules;
