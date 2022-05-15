import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import React, { ReactElement } from 'react'

interface IProps {
  title: string
  content: string
  closeDialog: () => void
  handleDelete: () => void
}

const DeleteDialog: React.FC<IProps> = ({
  title,
  content,
  closeDialog,
  handleDelete,
}: IProps): ReactElement => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Verwijder
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
