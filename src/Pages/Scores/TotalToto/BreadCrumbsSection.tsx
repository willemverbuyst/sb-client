import { Breadcrumbs, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { ReactElement } from 'react';

import TotoRoundSelector from '../../../Components/Selector/TotoRoundSelector';
import { breadCrumbs } from '../../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...breadCrumbs(theme),
}));

const BreadCrumbsSection: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.breadCrumbs}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Button color="primary" disabled>
          Totaal Toto
        </Button>
        <TotoRoundSelector />
        <Button color="primary" disabled>
          Ronde
        </Button>
      </Breadcrumbs>
    </Grid>
  );
};

export default BreadCrumbsSection;
