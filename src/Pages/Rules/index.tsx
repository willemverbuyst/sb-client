import React, { ReactElement } from 'react';

import PageTitle from '../../Components/Title/PageTitle';
import PageContent from '../../Sections/PageContent';
import AccordionWithRules from './AccordionWithRules';

const Rules: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Regels"
      content={
        <>
          <PageTitle title="Regels" color="secondary" />
          <AccordionWithRules />
        </>
      }
    />
  );
};

export default Rules;
