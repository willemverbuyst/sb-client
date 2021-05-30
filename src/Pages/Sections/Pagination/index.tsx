import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import PaginationComponent from '../../../Components/Pagination';

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  totoRound: string;
  round: string;
  countTotoRound: number;
  countRound: number;
  handleChangeTotoRounds: (_event: React.ChangeEvent<unknown>, value: number) => void;
  handleChangeRounds: (_event: React.ChangeEvent<unknown>, value: number) => void;
}

const Pagination: React.FC<IProps> = ({
  totoRound,
  round,
  countTotoRound,
  countRound,
  handleChangeTotoRounds,
  handleChangeRounds,
}: IProps): ReactElement => {
  const classes = useStyles();

  const t = Number(totoRound);
  const r = Number(round);

  return (
    <Grid className={classes.paginationContainer}>
      <PaginationComponent
        label="Totoronde"
        page={t}
        count={countTotoRound}
        color="primary"
        onChange={handleChangeTotoRounds}
      />
      <PaginationComponent
        label="Speelronde"
        page={r}
        count={countRound}
        color="secondary"
        onChange={handleChangeRounds}
      />
    </Grid>
  );
};

export default Pagination;
