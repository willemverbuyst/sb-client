import { Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

import { formatTimeStampToLocalDate } from '../../../utils/timeFunctions';

interface IProps {
  eventTimeStamp: number;
}

const MatchCardTop: React.FC<IProps> = ({ eventTimeStamp }: IProps): ReactElement => {
  return (
    <Grid item xs={12} container justify="center">
      <Typography variant="overline" color="textSecondary">
        {formatTimeStampToLocalDate(eventTimeStamp)}
      </Typography>
    </Grid>
  );
};

export default MatchCardTop;
