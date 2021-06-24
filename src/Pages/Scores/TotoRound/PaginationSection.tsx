import { Grid, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';

import PaginationComponent from '../../../Components/Pagination';
import { TOTO_ROUNDS } from '../../../constants/setupGame';
import * as HISTORY from '../../../history';

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  totoRound: string;
}

const PaginationSection: React.FC<IProps> = ({ totoRound }: IProps): ReactElement => {
  const classes = useStyles();

  const t = Number(totoRound);

  const gotoTotoRound = (_event: React.ChangeEvent<unknown>, value: number): void => HISTORY.gotoRankingRound(value);

  return (
    <Grid className={classes.paginationContainer}>
      <PaginationComponent label="Totoronde" page={t} count={TOTO_ROUNDS} color="primary" onChange={gotoTotoRound} />
    </Grid>
  );
};

export default PaginationSection;
