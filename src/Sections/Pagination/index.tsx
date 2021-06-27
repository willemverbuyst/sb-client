import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';

import PaginationComponent from '../../Components/Pagination';
import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../constants/setupGame';
import * as UTILS from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  totoRound: string;
  round: string;
  gotoTotoRound: (value: number, r: number) => void;
  gotoRound: (value: number, t: number) => void;
}

const Pagination: React.FC<IProps> = ({ totoRound, round, gotoTotoRound, gotoRound }: IProps): ReactElement => {
  const classes = useStyles();

  let t = Number(totoRound);
  let r = Number(round);

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    r = UTILS.roundByTotoRound(value);
    gotoTotoRound(value, r);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number): void => {
    t = UTILS.totoRoundByRound(value);
    gotoRound(value, t);
  };

  return (
    <Grid className={classes.paginationContainer}>
      <PaginationComponent
        label="Totoronde"
        page={t}
        count={TOTO_ROUNDS}
        color="primary"
        onChange={handleChangeTotoRounds}
      />
      <PaginationComponent
        label="Speelronde"
        page={r}
        count={TOTAL_ROUNDS}
        color="secondary"
        onChange={handleChangeRounds}
      />
    </Grid>
  );
};

export default Pagination;
