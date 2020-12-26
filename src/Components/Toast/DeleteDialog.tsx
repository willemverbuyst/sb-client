import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { playerDelete } from '../../store/players/actions';
import { IPlayer } from '../../models/player.model';

type Props = {
  playerToDelete: IPlayer;
  closeDialog: () => void;
};

export default function DeleteDialog(props: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(playerDelete(+props.playerToDelete.id));
    props.closeDialog();
  };

  const handleCancel = () => {
    props.closeDialog();
  };

  return (
    <div>
      <Dialog open={true} fullScreen={fullScreen} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{`Weet je zeker dat je ${props.playerToDelete.firstName} ${props.playerToDelete.lastName} wilt verwijderen?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wanneer je deze speler verwijderd, wordt alle data uit de database gewist.
            <br />
            Er is dan geen weg terug...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Verwijder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
