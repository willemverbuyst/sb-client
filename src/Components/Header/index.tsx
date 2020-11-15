import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutline from '@material-ui/icons/HelpOutline';
import List from '@material-ui/icons/List';
import Build from '@material-ui/icons/Build';
import EmojiEvents from '@material-ui/icons/EmojiEvents'
import Home from '@material-ui/icons/Home';
import Schedule from '@material-ui/icons/Schedule';
import Today from  '@material-ui/icons/Today';
import { selectToken } from '../../store/user/selectors';
import { userLogOut } from '../../store/user/actions';
import ball from "../../assets/ball.png";
import { Box, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { getToday, getTime } from '../../utils/timeFunctions';

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
      backgroundColor: '#1e5eb1',
      color: '#fff'
    }
  }),
);

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const token = useSelector(selectToken);
  const [showToday, setShowToday] = useState(false)
  const [showTime, setShowTime] = useState(false)
  
  const gotoHome = () => history.push("/home");

  const gotoProfiel = () => history.push("/profiel");

  const gotoRegels = () => history.push("/regels");

  const gotoScores = () => history.push("/scores");

  const gotoSignUp = () => {
    handleClose()
    history.push("/admin/signup")
  };

  const gotoSpelers = () => {
    handleClose()
    history.push("/admin/spelers")
  };

  const gotoVoorspellingen = () => history.push("/voorspellingen");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
 
  const handleClose = () => setAnchorEl(null);
 
  return (
      <Box className={classes.header}>
          { token ? (
            <Toolbar>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoHome}>
                <Tooltip title="Home">
                  <Home />
                </Tooltip>
              </IconButton>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoVoorspellingen}>
                <Tooltip title="Voorspellingen">
                  <List />
                </Tooltip>
              </IconButton>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoScores}>
                <Tooltip title="Scores">  
                  <EmojiEvents />
                </Tooltip>
              </IconButton>
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoProfiel}>
                <Tooltip title="Profiel">
                  <AccountCircle />
                </Tooltip>
              </IconButton>
            
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account 
                circle" onClick={handleClick}>
                  <Tooltip title="Admin">
                    <Build />
                  </Tooltip>
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={gotoSignUp}>Signup</MenuItem>
                <MenuItem onClick={gotoSpelers}>Spelers</MenuItem>
              </Menu>
          
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoRegels}>
                <Tooltip title="Regels">
                  <HelpOutline />
                </Tooltip>
              </IconButton>
            
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={() => setShowToday (!showToday)}>
                <Tooltip title="Datum">
                  <Today />
                </Tooltip>
              </IconButton>

              {showToday ? 
                <Box className={classes.text}>       
                  {getToday()}
                </Box> : null }
          
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={() => setShowTime(!showTime)}>
                <Tooltip title="Tijd">
                  <Schedule />
                </Tooltip>
              </IconButton>
             
              {showTime ? 
                <Box className={classes.text}>       
                  {getTime()}
                </Box> : null }

              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="log out" onClick={() => dispatch(userLogOut())} >
                <Tooltip title="Log Out">
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