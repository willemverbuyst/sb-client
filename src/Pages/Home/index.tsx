import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import TopThreeTable from '../../Components/Table/TopThreeTable'

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  }
}));

export default function Home() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  });

  return (
    token ? (  
      <Box>
        <Typography variant="h2" className={classes.title}>
          Home
        </Typography>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid><TopThreeTable /></Grid>
          <Grid><TopThreeTable /></Grid>
          
        </Grid>
      </Box>
    ) : ( null )
  )
}
