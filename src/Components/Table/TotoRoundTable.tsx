import React from 'react';
import { useHistory } from 'react-router';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserWithTotoRoundScore } from '../../store/scores/types';

const useStyles = makeStyles(() => ({
  link: {
    cursor: 'pointer'
  }
}));

const sortTable = (arr: UserWithTotoRoundScore[]): UserWithTotoRoundScore[] => [...arr]
  .sort((score1, score2) => score2.score - score1.score)
  .sort((name1, name2) => name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()));

type Prop = {
  totoRound: UserWithTotoRoundScore[];
}

export default function TotoRoundTable({ totoRound }: Prop) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Speler</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortTable(totoRound).map((score, i) => (
            <TableRow key={i}>
              <TableCell align="left" className={classes.link} onClick={()=> history.push(`/spelers/${score.id}`)}>
                {score.user}
              </TableCell>
              <TableCell align="right">
                {score.score}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}