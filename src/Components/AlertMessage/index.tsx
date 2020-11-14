import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { selectMessage } from '../../store/appState/selectors';

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

export default function AlertMessage() {
  const classes = useStyles();
  const message = useSelector(selectMessage);

  return message ? (
    <div className={classes.root}>
      <Alert severity={message.severity}>{message.text}</Alert>
    </div>
  ): null;
}

