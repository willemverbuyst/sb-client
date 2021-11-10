import { makeStyles, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { ReactElement } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IProps {
  message: string
  displayAlert: boolean
  closeAlert: () => void
}

const ShowAlertComponent: React.FC<IProps> = ({
  message,
  displayAlert,
  closeAlert,
}: IProps): ReactElement | null => {
  const classes = useStyles()

  return displayAlert ? (
    <Alert
      onClose={closeAlert}
      severity="error"
      variant="outlined"
      className={classes.margin}
    >
      {message}
    </Alert>
  ) : null
}

export default ShowAlertComponent
