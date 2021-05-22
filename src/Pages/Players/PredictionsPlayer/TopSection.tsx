import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import ButtonComponent from '../../../Components/Button';
import PageTitleComponent from '../../../Components/Title/PageTitle';
import { topSection } from '../../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  name: string;
  gotoScores: () => void;
}

const TopSection: React.FC<IProps> = ({ name, gotoScores }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text={name} />
      <ButtonComponent caption="SCORES" color="secondary" handleClick={gotoScores} />
    </Grid>
  );
};

export default TopSection;
