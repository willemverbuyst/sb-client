import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors';
import { userLogOut } from '../../store/user/actions';
import { getToday, getTimeNow } from '../../utils/timeFunctions';
import ball from "../../assets/ball.png";
import { 
  createStyles, 
  makeStyles, 
  Theme 
} from '@material-ui/core/styles';
import { 
  Box,
  IconButton, 
  Toolbar, 
  Tooltip,
  Typography,
} from '@material-ui/core';
import Face from '@material-ui/icons/Face';
import List from '@material-ui/icons/List';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Group from '@material-ui/icons/Group';
import HelpOutline from '@material-ui/icons/HelpOutline';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Schedule from '@material-ui/icons/Schedule';
import Today from  '@material-ui/icons/Today';
import { Weekend } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      marginRight: theme.spacing(2),
    },
    text: {
      marginRight: theme.spacing(3),
      fontSize: 20
    },
    header: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff'
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [showToday, setShowToday] = useState(false)
  const [showTime, setShowTime] = useState(false)

  const gotoHome = () => history.push("/home");

  const gotoProfiel = () => history.push("/profiel");

  const gotoRegels = () => history.push("/regels");

  const gotoTotalToto= () => history.push("/scores/totaltoto");
  
  const gotoSignUp = () => history.push("/admin/signup")

  const gotoSpelers = () => history.push("/spelers")
  
  const gotoVoorspellingen = () => history.push("/voorspellingen/1/1");

  const gotoLogin = () => {
    dispatch(userLogOut)
    history.push("/login")
  }
 
  return (
      <Box className={classes.header}>
          { token ? (
            <Toolbar>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoHome}>
                <Tooltip title="Home" arrow>
                  <Weekend />
                </Tooltip>
              </IconButton>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoVoorspellingen}>
                <Tooltip title="Voorspellingen" arrow>
                  <List />
                </Tooltip>
              </IconButton>

              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoTotalToto}>
                <Tooltip title="Totaltoto" arrow>  
                  <EmojiEvents />
                </Tooltip>
              </IconButton>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoProfiel}>
                <Tooltip title="Profiel"  arrow>
                  <Face />
                </Tooltip>
              </IconButton>

              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoSpelers}>
                <Tooltip title="Spelers" arrow>
                  <Group />
                </Tooltip>
              </IconButton>
            
              { user && user.admin ? (
                <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoSignUp}>
                  <Tooltip title="Sign up" arrow>
                    <PersonAdd />
                  </Tooltip>
                </IconButton>
              ) : ('')}   
          
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoRegels}>
                <Tooltip title="Regels" arrow>
                  <HelpOutline />
                </Tooltip>
              </IconButton>
            
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={() => setShowToday (!showToday)}>
                <Tooltip title="Datum" arrow>
                  <Today />
                </Tooltip>
              </IconButton>

              {showToday ? 
                <Box className={classes.text}>       
                  {getToday()}
                </Box> : '' }
          
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={() => setShowTime(!showTime)}>
                <Tooltip title="Tijd" arrow>
                  <Schedule />
                </Tooltip>
              </IconButton>
             
              {showTime ? 
                <Box className={classes.text}>       
                  {getTimeNow()}
                </Box> : '' }

              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="log out" onClick={gotoLogin} >
                <Tooltip title="Log Out" arrow>
                  <ExitToAppIcon />
                </Tooltip>
              </IconButton>
           
            </Toolbar>
            ) : (
            <Toolbar>
              <img src={ball} style={{ width: "40px", margin: "0 10px 0 0" }} alt="soccer ball" />
              <Typography variant="h6">
                Sport Betting App
              </Typography>
            </Toolbar>
          )}
      </Box>
  );
}