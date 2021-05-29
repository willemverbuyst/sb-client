import { Button } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface ITableButtonProps {
  caption: string;
  color: 'primary' | 'secondary';
  handleClick: () => void;
}

const TableButton: React.FC<ITableButtonProps> = ({ caption, color, handleClick }: ITableButtonProps): ReactElement => (
  <Button size="small" variant="text" color={color} onClick={handleClick}>
    {caption}
  </Button>
);

export default TableButton;
