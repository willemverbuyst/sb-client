import { TableCell, TableHead, TableRow } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { Align } from '../../models/table.models'

interface IProps {
  headers: [string, Align][]
}

const TableHeaders: React.FC<IProps> = ({ headers }: IProps): ReactElement => (
  <TableHead>
    <TableRow>
      {headers.map((header) => (
        <TableCell key={header[0]} align={header[1]}>
          {header[0]}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
)

export default TableHeaders
