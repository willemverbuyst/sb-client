import { TableCell, TableRow } from '@material-ui/core';
import React, { ReactElement } from 'react';

type Align = 'inherit' | 'left' | 'center' | 'right' | 'justify';
type CellValue = string | JSX.Element | null;

interface IProps {
  cells: [CellValue, Align][];
}

const TableCells: React.FC<IProps> = ({ cells }: IProps): ReactElement => {
  return (
    <TableRow>
      {cells.map((cell, i) => (
        <TableCell key={i} align={cell[1]}>
          {cell[0]}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default TableCells;
