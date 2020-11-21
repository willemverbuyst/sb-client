import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/selectors'
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
import { Player } from '../../store/players/types';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 30,
    width: 30,
  },
  checkToto: {
    color: theme.palette.primary.main,
  },
  checkAdmin: {
    color: theme.palette.secondary.main,
  },
  link: {
    cursor: 'pointer'
  }
}));

const sortTable = (arr: Player[]): Player[] => [...arr]
  .sort((player1, player2) => player1.userName.toLowerCase().localeCompare(player2.userName.toLowerCase()))

type Prop = {
  players: Player[]
}

export default function SpelersTable({players}: Prop) {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory()

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">admin</TableCell>
            <TableCell align="left">user name</TableCell>
            <TableCell align="left">team</TableCell>
            <TableCell align="left">naam</TableCell>
            { user && user.admin ? <TableCell align="left">achternaam</TableCell> : null }
            <TableCell align="center">totaal-toto</TableCell>
            { user && user.admin ? <TableCell align="left">telefoon</TableCell> : null }
            <TableCell align="left">email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortTable(players).map((player, i) => (

            <TableRow key={i}>
              { user && user.admin ?  
                <TableCell align="center">
                  <Checkbox
                    checked={player.admin}
                    name="checkedB"
                    color="primary"
                  />
                </TableCell>
              :    
              <TableCell className={classes.checkAdmin} align="center">
                {player.admin ? <Check/> : null}
              </TableCell> 
              }
             
              <TableCell align="left" className={classes.link} onClick={()=> history.push(`/spelers/${player.id}`)}>
                {player.userName}
              </TableCell>

              <TableCell align="left">
                <Avatar className={classes.avatar} alt={player.team.name} src={player.team.logo} />
              </TableCell>

              <TableCell align="left">
                {player.firstName}
              </TableCell>

              { user && user.admin ?  
                <TableCell align="left">
                  {player.lastName}
                </TableCell>
              : null }

              <TableCell className={classes.checkToto} align="center">
                {player.totaalToto ? <Check/> : null}
              </TableCell> 

              { user && user.admin ?  
                <TableCell align="left">
                  {player.phoneNumber}
                </TableCell>
              : null }

              <TableCell align="left">
                {player.email}
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}