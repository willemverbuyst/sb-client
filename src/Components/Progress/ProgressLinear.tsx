import { Box } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

// export const progress = (): IProgress => ({
//   progress: {
//     width: '100%',
//   },
// });

const ProgressLinear: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <LinearProgress color="secondary" />
      <LinearProgress color="primary" />
    </Box>
  );
};

export default ProgressLinear;
