import { Button } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface IProps {
  caption: string;
  color: 'primary' | 'secondary';
  handleClick: () => void;
}

const CardButton: React.FC<IProps> = ({ caption, color, handleClick }: IProps): ReactElement => (
  <Button variant="contained" size="small" color={color} disableElevation onClick={handleClick}>
    {caption}
  </Button>
);

export default CardButton;
