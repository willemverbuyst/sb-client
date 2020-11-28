import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Avatar,
  Checkbox,
  TableCell, 
  TableRow,
  Tooltip, 
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import { IPlayer } from '../../models/player.model';

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

type Props = {
  key: number;
  player: IPlayer;
  userIsAdmin: boolean;
}

export default function PlayerRow(props: Props) {
  const classes = useStyles();
  const history = useHistory()
  const [playerIsAdmin, setPlayerIsAdmin] = useState<boolean>(props.player.admin)

  return (
    <TableRow>
      { props.userIsAdmin ?  
        <TableCell align="center">
          <Tooltip title="Update admin status?"> 
            <Checkbox
              name="isAdmin"
              color="primary"
              checked={playerIsAdmin}
              onChange={() => setPlayerIsAdmin(!playerIsAdmin)}
            />
          </Tooltip> 
        </TableCell>
      :    
        <TableCell className={classes.checkAdmin} align="center">
          {props.player.admin ? <Check/> : null}
        </TableCell> 
      }
             
      <TableCell align="left" className={classes.link} onClick={()=> history.push(`/spelers/${props.player.id}`)}>
        {props.player.userName}
      </TableCell>

      <TableCell align="left">
        <Avatar className={classes.avatar} alt={props.player.team.name} src={props.player.team.logo} />
      </TableCell>

      <TableCell align="left">
        {props.player.firstName}
      </TableCell>

      { props.userIsAdmin ?  
        <TableCell align="left">
          {props.player.lastName}
        </TableCell>
      : null }

      <TableCell className={classes.checkToto} align="center">
        {props.player.totaalToto ? <Check/> : null}
      </TableCell> 

      { props.userIsAdmin?  
        <TableCell align="left">
          {props.player.phoneNumber}
        </TableCell>
      : null }

      <TableCell align="left">
        {props.player.email}
      </TableCell>
      
    </TableRow>
  )
}
