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
}

const useStyles = makeStyles({
  input: {
    '& input + fieldset': {
      borderColor: '#f44336',
      borderWidth: '2px',
    },
  },
});

const ControllerEmailInput = <T extends FieldValues>({
  control,
  defaultValue,
  error,
  label,
  name,
}: IProps<T>): ReactElement => {
  const classes = useStyles();

  return (
    <Controller
      control={control}
      rules={{
        required: 'This field is required',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Please enter a valid email',
        },
      }}
      render={({ field }) => (
        <>
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
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
      defaultValue={defaultValue}
    />
  );
};

export default ControllerEmailInput;
