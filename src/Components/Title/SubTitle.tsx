import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import { subTitle, subTitleSection } from '../../ui/sharedClasses';

const useStyles = makeStyles((theme: Theme) => ({
  ...subTitle(theme),
  ...subTitleSection(theme),
}));

interface IProps {
  text: string;
}

const SubTitle = ({ text }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center" className={classes.subTitleSection}>
      <Typography variant="h4" className={classes.subTitle}>
        {text}
      </Typography>
    </Grid>
  );
};

export default SubTitle;
