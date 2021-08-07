import { Box } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PageTitle from '../../Components/Title/PageTitle';
import Guard from '../../Sections/Guard';
import AccordionWithRules from './AccordionWithRules';

const Rules: React.FC = (): ReactElement => {
  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Regels" color="secondary" />
          <AccordionWithRules />
        </Box>
      }
    />
  );
};

export default Rules;
