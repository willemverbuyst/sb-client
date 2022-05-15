import { makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(() => ({
  inputBox: {
    width: 40,
    padding: '3px',
    textAlign: 'right',
  },
}))

interface IProps {
  defaultValue: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const NumberFieldComponent: React.FC<IProps> = ({
  defaultValue,
  onChange,
}: IProps) => {
  const classes = useStyles()

  return (
    <TextField
      id="outlined-number"
      type="number"
      defaultValue={defaultValue || 0}
      onChange={onChange}
      InputProps={{
        classes: {
          input: classes.inputBox,
        },
        inputProps: {
          min: 0,
          max: 99,
        },
      }}
    />
  )
}

export default NumberFieldComponent
