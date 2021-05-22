import { Grid } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import PageTitleComponent from '../../Components/Title/PageTitle';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const TopSection: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Programma" />
    </Grid>
  );
};
export default TopSection;
