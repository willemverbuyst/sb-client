import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { ReactElement } from 'react';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  label: string;
  validateLength: boolean;
}

const useStyles = makeStyles({
  input: {
    '& input + fieldset': {
      borderColor: '#f44336',
      borderWidth: '2px',
    },
  },
});

const ControllerPasswordInput = <T extends FieldValues>({
  control,
  error,
  label,
  name,
  validateLength,
}: IProps<T>): ReactElement => {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      rules={{
        required: 'This field is required',
        minLength: validateLength
          ? {
              value: 8,
              message: 'Password must have at least 8 characters',
            }
          : undefined,
      }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            label={label}
            InputProps={{
              className: error ? classes.input : '',
            }}
          />
          {error && <Typography color="error">{error?.message}</Typography>}
        </>
      )}
      name={name}
    />
  );
};

export default ControllerPasswordInput;
