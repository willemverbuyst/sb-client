import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import PaginationComponent from '../../Components/Pagination';
import { TOTAL_ROUNDS, TOTO_ROUNDS } from '../../constants/setupGame';
import { pagination } from '../../ui/sharedClasses';
import { roundByTotoRound, totoRoundByRound } from '../../utils/parameterFunctions';

const useStyles = makeStyles((theme: Theme) => ({
  ...pagination(theme),
}));

interface IProps {
  totoronde: string;
  ronde: string;
}

const PaginationSection: React.FC<IProps> = ({ totoronde, ronde }: IProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  let t = +totoronde;
  let r = +ronde;

  const handleChangeTotoRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    r = roundByTotoRound(value);
    history.push(`/voorspellingen/${value}/${r}`);
  };

  const handleChangeRounds = (_event: React.ChangeEvent<unknown>, value: number) => {
    t = totoRoundByRound(value);

    history.push(`/voorspellingen/${t}/${value}`);
  };

  return (
    <Grid className={classes.pagination}>
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

export default PaginationSection;
