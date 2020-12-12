import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMessage } from '../../store/appState/selectors';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Toast() {
  const message = useSelector(selectMessage);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(!!message)
  }, [message])
 

  return message ? (
    <div className={classes.root}>
      <Snackbar 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open} 
        autoHideDuration={3000} 
        onClose={handleClose}
      >
        <Alert severity={message.severity}>
          {message.text}
        </Alert>
      </Snackbar>
    </div>) : null;
}

