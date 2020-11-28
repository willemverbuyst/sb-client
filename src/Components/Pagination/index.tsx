import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

type Props = {
  label: string;
  totoRoundNumber: number;
  numberFixtures: number;
  color: 'primary' | 'secondary' | 'standard';
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationComponent(props: Props) {
  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Typography variant="overline" gutterBottom>
            {props.label}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Pagination 
            page={props.totoRoundNumber} 
            count={props.numberFixtures} 
            color={props.color} 
            onChange={props.onChange} 
          />
        </Grid>
      </Grid>  
    </>  
  )
}
