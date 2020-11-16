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

const useStyles = makeStyles({
  table: {
    width: 350,
  },
  title: {
    textAlign: 'center',
  }
});

function createData(player: string, score: number) {
  return { player, score };
}

const rows = [
  createData('Piet Sjaakie', 159),
  createData('Anna Ecalir', 237),
  createData('Fred Fries', 450),
];

export default function ScoresTable() {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2} align="center" >
              <Typography variant="h4">Top 3 toto's</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {row.player}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}