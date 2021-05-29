import { Button, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { ReactElement } from 'react';

interface IProps {
  caption: string;
  color: 'primary' | 'secondary';
  handleClick: () => void;
}

const ButtonComponent: React.FC<IProps> = ({ caption, color, handleClick }: IProps): ReactElement => {
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid>
      <Button
        fullWidth
        variant={btnVariant ? 'contained' : 'outlined'}
        size="small"
        color={color}
        disableElevation
        onClick={handleClick}
      >
        {caption}
      </Button>
    </Grid>
  );
};

export default ButtonComponent;
