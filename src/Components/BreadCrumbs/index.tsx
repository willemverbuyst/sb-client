import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Button, Breadcrumbs, Grid} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import TotoRoundSelector from '../Button/TotoRoundSelector';

const useStyles = makeStyles((theme) => ({
  breadCrumbs: {
    marginTop: theme.spacing(6),
  }
}));

export default function BreadCrumbsScores() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Grid 
      container 
      justify="center" 
      className={classes.breadCrumbs}
    >
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        aria-label="breadcrumb"
      >
       <Button
          variant='outlined'
          color="primary"
          aria-label="Ga naar totaal toto"
          onClick={()=> history.push('/scores/totaaltoto')}
          disableElevation 
        >
          Totaal Toto
        </Button>
        <TotoRoundSelector />
        <Button
          variant='outlined'
          color="primary"
          aria-label="Ga naar totaal toto"
          onClick={()=> history.goBack()}
          disableElevation 
        >
          Totoronde
        </Button>
      </Breadcrumbs>
    </Grid>
  )
}
