import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { topSection } from '../../ui/sharedClasses';
import PageTitleComponent from '../Title/PageTitle';

const useStyles = makeStyles((theme: Theme) => ({
  ...topSection(theme),
}));

interface IProps {
  text: string;
}

const PageHeaderWithoutButton: React.FC<IProps> = ({ text }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.topSection}>
      <PageTitleComponent text={text} />
    </Grid>
  );
};

export default PageHeaderWithoutButton;
