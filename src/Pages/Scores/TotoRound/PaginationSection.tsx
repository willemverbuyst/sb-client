import { Grid, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import PaginationComponent from '../../../Components/Pagination';
import { TOTO_ROUNDS } from '../../../constants/setupGame';

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  totoRound: string;
}

const PaginationSection: React.FC<IProps> = ({ totoRound }: IProps): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  const t = Number(totoRound);

  const gotoTotoRound = (_event: React.ChangeEvent<unknown>, value: number): void =>
    history.push(`/klassement/totoronde/${value}`);

  return (
    <Grid className={classes.paginationContainer}>
      <PaginationComponent label="Totoronde" page={t} count={TOTO_ROUNDS} color="primary" onChange={gotoTotoRound} />
    </Grid>
  );
};

export default PaginationSection;
