import { TableCell, TableRow } from '@material-ui/core'
import React, { ReactElement } from 'react'

import { Align, CellValue } from '../../models/table.models'

interface IProps {
  cells: [CellValue, Align][]
}

const TableCellsOneRow: React.FC<IProps> = ({
  cells,
}: IProps): ReactElement => (
  <TableRow>
    {cells.map((cell, i) => (
      <TableCell key={i} align={cell[1]}>
        {cell[0]}
      </TableCell>
    ))}
  </TableRow>
)

export default TableCellsOneRow
