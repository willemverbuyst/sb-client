import React from 'react';
import { 
  createStyles, 
  makeStyles, 
  Theme 
} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

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

export default function ProgressLinear({colorSpinner}: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress />
      <LinearProgress color={colorSpinner} />
    </div>
  );
}