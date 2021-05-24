import { TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { ReactElement } from 'react';

import TableHeadersAdmin from './TableHeadersAdmin';

const TableHeaders: React.FC = (): ReactElement => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center">admin</TableCell>
        <TableCell align="left">user name</TableCell>
        <TableCell align="left">team</TableCell>
        <TableCell align="center">totaal-toto</TableCell>
        <TableCell align="left">naam</TableCell>
        <TableHeadersAdmin />
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
