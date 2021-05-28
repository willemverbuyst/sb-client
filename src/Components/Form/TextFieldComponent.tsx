import { TextField } from '@material-ui/core';
import React from 'react';

interface IProps {
  id: string;
  label: string;
  value: string;
  onChange: () => void;
}

const TextFieldComponent: React.FC<IProps> = ({ id, label, value, onChange }: IProps) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={id}
      label={label}
      name={id}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextFieldComponent;
