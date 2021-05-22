import { Grid, Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  subTitleSection: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(0),
    },
    marginBottom: theme.spacing(6),
  },
  subTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      opacity: '0.7',
    },
  },
}));

interface IProps {
  text: string;
}

const SubTitleComponent: React.FC<IProps> = ({ text }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center" className={classes.subTitleSection}>
      <Typography variant="h4" className={classes.subTitle}>
        {text}
      </Typography>
    </Grid>
  );
};

export default SubTitleComponent;
