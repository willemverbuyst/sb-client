import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Check from '@material-ui/icons/Check';
import React, { ReactElement } from 'react';

import { IPlayer } from '../../../../models/player.model';

const useStyles = makeStyles((theme: Theme) => ({
  checkAdmin: {
    color: theme.palette.secondary.main,
  },
}));

const renderIsAdminCheck = (
  editModus: boolean,
  isAdmin: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  player: IPlayer,
): ReactElement | null => {
  const classes = useStyles();

  return editModus ? (
    <Checkbox
      checked={isAdmin}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'primary checkbox' }}
    />
  ) : player.admin ? (
    <Check className={classes.checkAdmin} />
  ) : null;
};

export { renderIsAdminCheck };
