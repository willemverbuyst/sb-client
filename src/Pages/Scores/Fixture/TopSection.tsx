import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../../Components/Button';
import PageTitleComponent from '../../../Components/Title/PageTitle';
import { topSection } from '../../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

const TopSection: React.FC = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Uitslag" />
      <ButtonComponent caption="TERUG" color="primary" handleClick={goBack} />
    </Grid>
  );
};

export default TopSection;
