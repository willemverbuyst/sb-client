import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography
} from '@material-ui/core';
import { Score } from '../../store/scores/types';

const useStyles = makeStyles({
  table: {
    width: 350,
  },
});

type Prop = {
  scores: Score[]
}

export default function ScoresTable({scores}: Prop) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" >
              <Typography variant="h4">scores</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.map((score, i) => (
            <TableRow key={i}>
              <TableCell>
                {score.user}
              </TableCell>
              <TableCell align="right">{score.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}