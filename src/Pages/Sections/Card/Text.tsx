import { Grid, GridJustification, GridSize, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface IProps {
  xs: GridSize;
  content: string;
  justify: GridJustification;
}

const TextComponent: React.FC<IProps> = ({ xs, content, justify }: IProps): ReactElement => {
  return (
    <Grid item xs={xs} container justify={justify} alignItems="center">
      <Typography>{content}</Typography>
    </Grid>
  );
};

export default TextComponent;
