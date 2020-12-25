import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Button,
  Checkbox,
  TableCell, 
  TableRow,
} from '@material-ui/core';
import Check from '@material-ui/icons/Check';
import { makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import { IPlayer } from '../../models/player.model';
import { updatePlayerAdminStatus } from '../../store/players/actions';
import { red } from '@material-ui/core/colors';

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

const ColorButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
}))(Button);

type Props = {
  key: number;
  player: IPlayer;
  userIsAdmin: boolean;
  updateStatus: boolean;
}

export default function PlayerRow(props: Props) {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState<boolean>(props.player.admin)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(!isAdmin)
    dispatch(updatePlayerAdminStatus(props.player.id, e.target.checked))
  }

  const gotoPredictions = () => 
    history.push(`/spelers/${props.player.id}/voorspellingen/1/1`)

  return (
    <TableRow>
     
      { props.updateStatus ? 
        <TableCell>
          <Checkbox
            checked={isAdmin}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
         </TableCell>
      : 
        <TableCell className={classes.checkAdmin} align="center">
          {props.player.admin ? <Check/> : null}
        </TableCell> 
      }
  
      <TableCell 
        align="left"  
        className={classes.link}
        onClick={gotoPredictions}
      >
        {props.player.userName}
      </TableCell>

      <TableCell align="left">
        <img 
          className={classes.avatar} 
          alt={props.player.team.name} 
          src={props.player.team.logo}
        />
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

      { props.userIsAdmin? 
      <TableCell align="left">
        {props.player.email}
      </TableCell>
      : null }

      { props.userIsAdmin && props.updateStatus ? 
      <TableCell align="left">
        <ColorButton size="small">
          DELETE
        </ColorButton>
      </TableCell>
      : null }
      
    </TableRow>
  )
}
