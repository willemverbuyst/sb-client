import { TableCell } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/selectors';

const TableHeadersAdmin: React.FC = (): ReactElement | null => {
  const user = useSelector(selectUser);

  return user && user.admin ? (
    <>
      <TableCell align="left">achternaam</TableCell>
      <TableCell align="left">telefoon</TableCell>
      <TableCell align="left">email</TableCell>
      <TableCell align="left"></TableCell>
      <TableCell align="left"></TableCell>
    </>
  ) : null;
};

export default TableHeadersAdmin;
