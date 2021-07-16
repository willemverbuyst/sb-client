import { Grid, TextField } from '@material-ui/core';
import React from 'react';

interface IProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordFieldComponent: React.FC<IProps> = ({
  id,
  label,
  value,
  onChange,
}: IProps) => {
  return (
    <Grid item xs={12}>
      <TextField
        type="password"
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
    </Grid>
  );
};

export default PasswordFieldComponent;
