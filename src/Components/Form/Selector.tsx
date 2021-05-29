import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Theme } from '@material-ui/core';
import React, { ChangeEvent } from 'react';

import { ITeam } from '../../models/toto.models';

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

interface IProps {
  label: string;
  labelId: string;
  id: string;
  value: number | '';
  onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
  options: ITeam[];
}

const SelectorComponent: React.FC<IProps> = ({ label, labelId, id, value, onChange, options }: IProps) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.select}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select labelId={labelId} id={id} value={value} onChange={onChange} label={label}>
          {[...options]
            .sort((optionOne, optionTwo) => optionOne.name.localeCompare(optionTwo.name))
            .map((team, i) => (
              <MenuItem key={i} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default SelectorComponent;
