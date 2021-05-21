import { Box, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PageTitle from '../../Components/PageTitle';
import { selectToken } from '../../store/user/selectors';
import { content, title, topSection } from '../../ui/sharedClasses';
import AccordionWithRules from './AccordionWithRules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ...content(theme),
    ...title(theme),
    ...topSection(theme),
  }),
);

const Rules: React.FC = (): ReactElement => {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) history.push('/login');
  });

  return (
    <Box>
      <Grid container className={classes.topSection}>
        <PageTitle text="Regels" />
      </Grid>
      <Grid container justify="center" className={classes.content}>
        <Grid item xs={12} md={8}>
          <AccordionWithRules />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Rules;
