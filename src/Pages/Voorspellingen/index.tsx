import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../store/user/selectors';
import { fetchAllFixtures } from '../../store/voorspellingen/actions';
import { selectFixtures } from '../../store/voorspellingen/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
    color: theme.palette.secondary.main
  }
}));

export default function Voorspellingen() {
  const classes = useStyles();
  const token = useSelector(selectToken);
  const history = useHistory();
  const dispatch = useDispatch();
  const fixtures = useSelector(selectFixtures)

  useEffect(() => {
    if (!token) history.push("/login");
  });

  useEffect(() => {
    dispatch(fetchAllFixtures());
  }, [dispatch]);

  console.log(fixtures)

  return (
    token ? (  
      <Typography variant="h2" className={classes.title}>
        Voorspellingen
      </Typography>
    ) : ( null )
  )
}
