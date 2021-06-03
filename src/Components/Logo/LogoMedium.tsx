import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

export const useStyles = makeStyles(() => ({
  logo: {
    height: 40,
    width: 40,
    objectFit: 'contain',
  },
}));

interface IProps {
  alt: string;
  source: string;
}

const LogoMediumComponent: React.FC<IProps> = ({ alt, source }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid item xs={1} container justify="center" alignItems="center">
      <img className={classes.logo} alt={alt} src={source} />
    </Grid>
  );
};

export default LogoMediumComponent;
