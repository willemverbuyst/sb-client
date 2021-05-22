import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../Components/Button';
import PageTitleComponent from '../../Components/Title/PageTitle';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  ronde: string;
}

const TopSection: React.FC<IProps> = ({ ronde }: IProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const r = Number(ronde);

  const gotoRanking = () => history.push(`/klassement/ronde/${r}`);

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Voorspellingen" />
      <ButtonComponent caption="KLASSEMENT" color="secondary" handleClick={gotoRanking} />
    </Grid>
  );
};

export default TopSection;
