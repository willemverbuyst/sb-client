import { Breadcrumbs, Button, Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import RoundSelector from '../../../Components/Selector/RoundSelector';

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

  const goto = () => history.push('/klassement/totaaltoto');

  return (
    <Grid container justify="center" className={classes.breadCrumbsContainer}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Button color="primary" onClick={goto}>
          Totaal Toto
        </Button>
        <Button color="primary" disabled>
          Toto Ronde {id}
        </Button>
        <RoundSelector />
      </Breadcrumbs>
    </Grid>
  );
};

export default BreadCrumbsSection;
