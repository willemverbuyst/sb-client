import React, { ReactElement } from 'react';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  message: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

type Props = {
  message: string;
};

const Message: React.FC<Props> = (props: Props): ReactElement => {
  const classes = useStyles();
  return (
    <Grid>
      <Typography variant="overline" className={classes.message}>
        {props.message}
      </Typography>
    </Grid>
  );
};

export default Message;
