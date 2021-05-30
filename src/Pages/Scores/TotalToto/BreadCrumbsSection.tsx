import { Breadcrumbs, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { ReactElement } from 'react';

import TotoRoundSelector from '../../../Components/Selector/TotoRoundSelector';

const useStyles = makeStyles((theme: Theme) => ({
  breadCrumbsContainer: {
    marginTop: theme.spacing(6),
  },
}));
const BreadCrumbsSection: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.breadCrumbsContainer}>
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
