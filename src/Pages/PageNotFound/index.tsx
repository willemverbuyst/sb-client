import { Box, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

import PageTitle from '../../Components/Title/PageTitle'

const PageNotFound: React.FC = (): ReactElement => (
  <Box>
    <PageTitle title="Looking for" color="secondary" />
    <Typography variant="h3">...oops 404</Typography>
  </Box>
)

export default PageNotFound
