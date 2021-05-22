import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import ButtonComponent from '../../../Components/Button';
import PageTitleComponent from '../../../Components/Title/PageTitle';
import { TOTAL_ROUNDS } from '../../../constants/setupGame';
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

  const gotoPredictions = () => {
    const t = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/voorspellingen/${t}/${+id}`);
  };

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text="Klassement" />
      <ButtonComponent caption="MIJN VOORSPELLINGEN" color="primary" handleClick={gotoPredictions} />
    </Grid>
  );
};

export default TopSection;
