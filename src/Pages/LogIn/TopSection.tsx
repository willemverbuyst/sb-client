import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import PageTitleComponent from '../../Components/Title/PageTitle';
import { topSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  text: string;
}

const TopSection: React.FC<IProps> = ({ text }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text={text} />
    </Grid>
  );
};

export default TopSection;
