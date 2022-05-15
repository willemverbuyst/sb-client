import { Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { ReactElement } from 'react'
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

import { useValidationStyles } from '../../theme/validation'

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined
  label: string
  validateLength: boolean
  newPassword?: string
}

const ControllerPasswordInput = <T extends FieldValues>({
  control,
  defaultValue,
  error,
  label,
  name,
  validateLength,
  newPassword,
}: IProps<T>): ReactElement => {
  const classes = useValidationStyles()

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
        validate: newPassword
          ? (value) => value === newPassword || 'The passwords do not match'
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
      defaultValue={defaultValue}
    />
  )
}

export default ControllerPasswordInput
