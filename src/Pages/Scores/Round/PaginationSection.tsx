import { Grid, makeStyles, Theme } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import PaginationComponent from '../../../Components/Pagination';
import { TOTAL_ROUNDS } from '../../../constants/setupGame';

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    marginBottom: theme.spacing(2),
  },
}));

interface IProps {
  round: string;
}

const PaginationSection: React.FC<IProps> = ({ round }: IProps): ReactElement => {
  const history = useHistory();
  const classes = useStyles();

  const t = Number(round);

  const gotoRound = (_event: React.ChangeEvent<unknown>, value: number): void =>
    history.push(`/klassement/ronde/${value}`);

  return (
    <Grid className={classes.paginationContainer}>
      <PaginationComponent label="Speelronde" page={t} count={TOTAL_ROUNDS} color="secondary" onChange={gotoRound} />
    </Grid>
  );
};

export default PaginationSection;
