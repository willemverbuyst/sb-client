import { Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PageContent from '../../Sections/PageContent';

const PageNotFound: React.FC = (): ReactElement => {
  return (
    <PageContent
      loadingText="Looking for ..."
      content={<Typography variant="h3">...oops 404</Typography>}
    />
  );
};

export default PageNotFound;
