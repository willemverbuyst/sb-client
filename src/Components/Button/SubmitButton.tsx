import { Button, Grid } from '@material-ui/core';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  submit: {
    marginTop: theme.spacing(3),
  },
}));

interface IProps {
  caption: string;
  color: 'primary' | 'secondary';
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SubmitButtonComponent: React.FC<IProps> = ({ caption, color, handleClick }: IProps): ReactElement => {
  const classes = useStyles();
  const theme = useTheme();
  const btnVariant = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid>
      <Button
        type="submit"
        fullWidth
        className={classes.submit}
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

export default SubmitButtonComponent;
