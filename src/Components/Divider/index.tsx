import { Divider, Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { divider } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...divider(theme),
}));

const DividerComponent = (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid className={classes.divider}>
      <Divider />
    </Grid>
  );
};

export default DividerComponent;
