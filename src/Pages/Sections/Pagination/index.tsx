import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import PaginationComponent from '../../../Components/Pagination';
import { roundByTotoRound, totoRoundByRound } from '../../../utils/parameterFunctions';

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
  gotoTotoRound: (value: number, r: number) => void;
  gotoRound: (value: number, t: number) => void;
}

const Pagination: React.FC<IProps> = ({
  totoRound,
  round,
  countTotoRound,
  countRound,
  gotoTotoRound,
  gotoRound,
}: IProps): ReactElement => {
  const classes = useStyles();

  let t = Number(totoRound);
  let r = Number(round);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    r = roundByTotoRound(value);
    gotoTotoRound(value, r);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    t = totoRoundByRound(value);
    gotoRound(value, t);
  };

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
