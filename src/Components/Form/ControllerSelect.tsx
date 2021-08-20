import {
  FormControl,
  makeStyles,
  MenuItem,
  Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { ReactElement } from 'react';
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

import { ITeam } from '../../models/toto.models';

interface IProps<T> extends UseControllerProps<T> {
  error: FieldError | undefined;
  label: string;
  teams: ITeam[];
}

const useStyles = makeStyles({
  input: {
    '& input + fieldset': {
      borderColor: '#f44336',
      borderWidth: '2px',
    },
  },
});

const ControllerSelect = <T extends FieldValues>({
  control,
  defaultValue,
  error,
  label,
  name,
  teams,
}: IProps<T>): ReactElement => {
  const classes = useStyles();

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
              {[...teams]
                .sort((optionOne, optionTwo) =>
                  optionOne.name.localeCompare(optionTwo.name),
                )
                .map((team, i) => (
                  <MenuItem key={i} value={team.id}>
                    {team.name}
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
  );
};

export default ControllerSelect;
