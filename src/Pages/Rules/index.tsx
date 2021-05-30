import React, { ReactElement } from 'react';

import PageHeaderWithoutButton from '../../Components/Header/PageHeaderWithoutBtn';
import PageContent from '../Sections/PageContent';
import AccordionWithRules from './AccordionWithRules';

const Rules: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Regels"
      content={
        <>
          <PageHeaderWithoutButton title="Regels" />
          <AccordionWithRules />
        </>
      }
    />
  );
};

export default Rules;
