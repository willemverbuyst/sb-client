import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      fontSize: '2.5rem',
    },
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
}));

interface IProps {
  text: string;
}

const PageTitleComponent = ({ text }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant="h3" className={classes.title}>
        {text}
      </Typography>
    </Grid>
  );
};

export default PageTitleComponent;
