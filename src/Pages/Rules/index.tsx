import { Box, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectToken } from '../../store/user/selectors';
import { title, topSection } from '../../ui/sharedClasses';
import AccordionWithRules from './AccordionWithRules';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
        <Grid>
          <Typography variant="h3" className={classes.title}>
            Regels
          </Typography>
        </Grid>
      </Grid>
      <AccordionWithRules />
    </Box>
  );
};

export default Rules;
