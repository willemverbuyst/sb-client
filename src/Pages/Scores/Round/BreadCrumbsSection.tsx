import { Breadcrumbs, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import { TOTAL_ROUNDS } from '../../../constants/setupGame';

const useStyles = makeStyles((theme: Theme) => ({
  breadCrumbsContainer: {
    marginTop: theme.spacing(6),
  },
}));

interface IProps {
  id: string;
}

const BreadCrumbsSection: React.FC<IProps> = ({ id }: IProps): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  const gotoTotalToto = () => history.push('/klassement/totaaltoto');

  const gotoTotoRound = () => {
    const tr = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

    history.push(`/klassement/totoronde/${tr}`);
  };

  const idTotoRonde = +id !== TOTAL_ROUNDS ? Math.floor((+id - 1) / 3) + 1 : Math.floor((+id - 2) / 3) + 1;

  return (
    <Grid container justify="center" className={classes.breadCrumbsContainer}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Button color="primary" onClick={gotoTotalToto}>
          Totaal Toto
        </Button>
        <Button color="primary" onClick={gotoTotoRound}>
          Totoronde {idTotoRonde}
        </Button>
        <Button color="primary" disabled>
          Ronde {id}
        </Button>
      </Breadcrumbs>
    </Grid>
  );
};

export default BreadCrumbsSection;
