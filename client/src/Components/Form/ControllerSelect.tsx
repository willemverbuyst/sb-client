import { FormControl, MenuItem, Typography } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { ReactElement } from 'react'
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

import { useValidationStyles } from '../../theme/validation'

interface IProps<T, U> extends UseControllerProps<T> {
  error: FieldError | undefined
  label: string
  options: U[]
}

const ControllerSelect = <
  T extends FieldValues,
  U extends { id: number; name: string }
>({
  control,
  defaultValue,
  error,
  label,
  name,
  options,
}: IProps<T, U>): ReactElement => {
  const classes = useValidationStyles()

  return (
    <Controller
      control={control}
      rules={{ required: 'This field is required' }}
      render={({ field }) => (
        <>
          <FormControl variant="outlined" fullWidth>
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              select
              label={label}
              InputProps={{
                className: error ? classes.input : '',
              }}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          {error && <Typography color="error">{error?.message}</Typography>}
        </>
      )}
      name={name}
      defaultValue={defaultValue}
    />
  )
}

export default ControllerSelect
