import { Snackbar } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React, { ReactElement, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectMessage } from '../../store/appState/selectors'

const Alert: React.FC<AlertProps> = (props: AlertProps): ReactElement => (
  <MuiAlert elevation={6} variant="filled" {...props} />
)

const Toast: React.FC = (): ReactElement | null => {
  const message = useSelector(selectMessage)
  const [open, setOpen] = useState(false)

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    setOpen(!!message)
  }, [message])

  return message ? (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={message.severity} id="displayAlert">
        {message.text}
      </Alert>
    </Snackbar>
  ) : null
}

export default Toast
