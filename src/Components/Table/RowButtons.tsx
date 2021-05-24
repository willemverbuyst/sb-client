import { Button, TableCell } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { Theme, withStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

export const RedButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

type IProps = {
  editModus: boolean;
  changeEditModus: () => void;
  deletePlayer: () => void;
};

const RowButtons: React.FC<IProps> = ({ editModus, changeEditModus, deletePlayer }: IProps): ReactElement => {
  return editModus ? (
    <>
      <TableCell align="left">
        <RedButton size="small" onClick={deletePlayer}>
          DELETE
        </RedButton>
      </TableCell>
      <TableCell align="left">
        <Button size="small" variant="contained" color="primary" onClick={changeEditModus}>
          CANCEL
        </Button>
      </TableCell>
    </>
  ) : (
    <TableCell align="left">
      <Button size="small" variant="outlined" color="primary" onClick={changeEditModus}>
        Edit
      </Button>
    </TableCell>
  );
};

export default RowButtons;
