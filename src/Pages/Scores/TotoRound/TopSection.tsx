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

interface IProps {
  id: string;
}

const TopSection: React.FC<IProps> = ({ id }: IProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const gotoTotoRound = () => history.push(`/voorspellingen/${id}/${+id * 3 - 2}`);

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Klassement" />
      <ButtonComponent caption="MIJN VOORSPELLINGEN" color="primary" handleClick={gotoTotoRound} />
    </Grid>
  );
};

export default TopSection;
