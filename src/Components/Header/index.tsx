import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors';
import { userLogOut } from '../../store/user/actions';
import { getToday, getTime } from '../../utils/timeFunctions';
import ball from "../../assets/ball.png";
import { 
  createStyles, 
  makeStyles, 
  Theme 
} from '@material-ui/core/styles';
import { 
  Box,
  Fade,
  IconButton, 
  Menu, 
  MenuItem,
  MenuProps,
  Toolbar, 
  Tooltip,
  Typography,
  withStyles
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle'
import List from '@material-ui/icons/List';
import Build from '@material-ui/icons/Build';
import EmojiEvents from '@material-ui/icons/EmojiEvents'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Home from '@material-ui/icons/Home';
import Schedule from '@material-ui/icons/Schedule';
import Today from  '@material-ui/icons/Today';

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

const StyledMenu = withStyles({
  paper: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
    TransitionComponent={Fade}
  />
));

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const [showToday, setShowToday] = useState(false)
  const [showTime, setShowTime] = useState(false)
  const [anchorElAdmin, setAnchorElAdmin] = React.useState<null | HTMLElement>(null);
  const [anchorElScores, setAnchorElScores] = React.useState<null | HTMLElement>(null);
  
  const gotoHome = () => history.push("/home");

  const gotoProfiel = () => history.push("/profiel");

  const gotoRegels = () => history.push("/regels");

  const gotoScores = () => {
    handleCloseScores()
    history.push("/scores");
  }

  const gotoSignUp = () => {
    handleCloseAdmin()
    history.push("/admin/signup")
  };

  const gotoSpelers = () => {
    handleCloseAdmin()
    history.push("/admin/spelers")
  };

  const gotoVoorspellingen = () => history.push("/voorspellingen");

  const handleAdmin = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElAdmin(event.currentTarget);
  const handleScores = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorElScores(event.currentTarget);
 
  const handleCloseAdmin = () => setAnchorElAdmin(null);
  const handleCloseScores = () => setAnchorElScores(null);
 
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
            
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={handleScores}>
                <Tooltip title="Scores">  
                  <EmojiEvents />
                </Tooltip>
              </IconButton>
              <StyledMenu
                id="simple-menu"
                anchorEl={anchorElScores}
                keepMounted
                open={Boolean(anchorElScores)}
                onClose={handleCloseScores}
              >
                <MenuItem onClick={gotoScores}>Games</MenuItem>
                <MenuItem onClick={gotoScores}>Matches</MenuItem>
                <MenuItem onClick={gotoScores}>Toto</MenuItem>
              </StyledMenu>
             
              
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoProfiel}>
                <Tooltip title="Profiel">
                  <AccountCircle />
                </Tooltip>
              </IconButton>
            
              { user && user.admin ? (
                <>
                  <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account 
                    circle" onClick={handleAdmin}>
                      <Tooltip title="Admin">
                        <Build />
                      </Tooltip>
                  </IconButton>
                  <StyledMenu
                    id="simple-menu"
                    anchorEl={anchorElAdmin}
                    keepMounted
                    open={Boolean(anchorElAdmin)}
                    onClose={handleCloseAdmin}
                  >
                    <MenuItem onClick={gotoSignUp}>Signup</MenuItem>
                    <MenuItem onClick={gotoSpelers}>Spelers</MenuItem>
                  </StyledMenu>
                </>
              ) : ('')}   
          
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
                </Box> : '' }
          
              <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={() => setShowTime(!showTime)}>
                <Tooltip title="Tijd">
                  <Schedule />
                </Tooltip>
              </IconButton>
             
              {showTime ? 
                <Box className={classes.text}>       
                  {getTime()}
                </Box> : '' }

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