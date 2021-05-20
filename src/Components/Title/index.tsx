import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { title } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...title(theme),
}));

interface IProps {
  pageTitle: string;
}

const Title = ({ pageTitle }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant="h3" className={classes.title}>
        {pageTitle}
      </Typography>
    </Grid>
  );
};

export default Title;
