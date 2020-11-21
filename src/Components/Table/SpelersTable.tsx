import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar,
  Checkbox,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
} from '@material-ui/core';
import Check from '@material-ui/icons/Check'
import { Player } from '../../store/admin/types';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 30,
    width: 30,
    margin: 'auto'
  },
  check: {
    color: theme.palette.primary.main,
  }
}));

type Prop = {
  players: Player[]
}

export default function SpelersTable({players}: Prop) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Admin</TableCell>
            <TableCell align="left">UserName</TableCell>
            <TableCell align="center">team</TableCell>
            <TableCell align="left">firstName</TableCell>
            <TableCell align="left">lastName</TableCell>
            <TableCell align="right">telefoon</TableCell>
            <TableCell align="center">totaalToto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player, i) => (
            <TableRow key={i}>
              <TableCell align="center">
                <Checkbox
                  checked={player.admin}
                  name="checkedB"
                  color="primary"
                />
              </TableCell>
              <TableCell align="left">
                {player.userName}
              </TableCell>
              <TableCell align="center">
                <Avatar className={classes.avatar} alt={player.team.name} src={player.team.logo} />
              </TableCell>
              <TableCell align="left">
                {player.firstName}
              </TableCell>
              <TableCell align="left">
                {player.lastName}
              </TableCell>
              <TableCell align="right">
                {player.phoneNumber}
              </TableCell>
              <TableCell className={classes.check} align="center">
                {player.totaalToto ? <Check/> : null}
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}