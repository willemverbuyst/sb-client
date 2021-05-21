import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { title } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...title(theme),
}));

interface IProps {
  text: string;
}

const PageTitle = ({ text }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant="h3" className={classes.title}>
        {text}
      </Typography>
    </Grid>
  );
};

export default PageTitle;
