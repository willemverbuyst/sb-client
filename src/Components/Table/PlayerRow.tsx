import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
  TableCell, 
  TableRow,
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { makeStyles } from '@material-ui/core/styles';
import { IPlayer } from '../../models/player.model';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 30,
    width: 30,
    objectFit: 'contain',
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

  return (
    <TableRow className={classes.link} onClick={()=> history.push(`/spelers/${props.player.id}`)}>
     
      <TableCell className={classes.checkAdmin} align="center">
        {props.player.admin ? <Check/> : null}
      </TableCell> 
  
             
      <TableCell align="left">
        {props.player.userName}
      </TableCell>

      <TableCell align="left">
        <img className={classes.avatar} alt={props.player.team.name} src={props.player.team.logo} />
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
