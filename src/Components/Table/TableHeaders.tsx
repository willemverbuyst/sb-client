import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '../../store/user/selectors';

const TableHeaders: React.FC = (): ReactElement => {
  const user = useSelector(selectUser);

  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">admin</TableCell>
        <TableCell align="left">user name</TableCell>
        <TableCell align="left">team</TableCell>
        <TableCell align="center">totaal-toto</TableCell>
        <TableCell align="left">naam</TableCell>

        {user && user.admin ? (
          <>
            <TableCell align="left">achternaam</TableCell>
            <TableCell align="left">telefoon</TableCell>
            <TableCell align="left">email</TableCell>
            <TableCell align="left"></TableCell>
            <TableCell align="left"></TableCell>
          </>
        ) : null}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
