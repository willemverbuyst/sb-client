import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';
import React from 'react';

interface IProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CheckBoxComponent: React.FC<IProps> = ({ checked, onChange, label }: IProps) => {
  return (
    <Grid item xs={12} sm={6}>
      <FormControlLabel control={<Checkbox checked={checked} color="primary" onChange={onChange} />} label={label} />
    </Grid>
  );
};

export default CheckBoxComponent;
