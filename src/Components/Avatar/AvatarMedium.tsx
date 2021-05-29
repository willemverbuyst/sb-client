import { Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

export const useStyles = makeStyles((theme) => ({
  avatar: {
    [theme.breakpoints.down('xs')]: {
      transform: 'scale(0.8)',
    },
  },
}));

interface IProps {
  alt: string;
  source: string;
}

const AvatarMediumComponent: React.FC<IProps> = ({ alt, source }: IProps): ReactElement => {
  const classes = useStyles();

  return (
    <Grid container item xs={1} justify="center" alignItems="center">
      <Avatar alt={alt} src={source} className={classes.avatar} />
    </Grid>
  );
};

export default AvatarMediumComponent;
