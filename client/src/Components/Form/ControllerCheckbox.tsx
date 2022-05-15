import { Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Controller, FieldValues, UseControllerProps } from 'react-hook-form'

interface IProps<T> extends UseControllerProps<T> {
  label: string
}

const ControllerCheckbox = <T extends FieldValues>({
  control,
  defaultValue,
  label,
  name,
}: IProps<T>): ReactElement => (
  <Controller
    control={control}
    render={({ field }) => (
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox color="primary" {...field} checked={!!field.value} />
          }
          label={label}
        />
      </Grid>
    )}
    name={name}
    defaultValue={defaultValue}
  />
)

export default ControllerCheckbox
