import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HelpOutline from '@material-ui/icons/HelpOutline';
import List from '@material-ui/icons/List';
import Build from '@material-ui/icons/Build';
import EmojiEvents from '@material-ui/icons/EmojiEvents'
import Home from '@material-ui/icons/Home'
import { selectToken } from '../../store/user/selectors';
import { userLogOut } from '../../store/user/actions';
import ball from "../../assets/ball.png";
import { Menu, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory();
  const token = useSelector(selectToken);

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
    <div className={classes.root}>
      <AppBar position="static">
        
          { token ? (
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="account circle" onClick={gotoHome}>
                <Home />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={gotoVoorspellingen}>
                <List />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="account circle" onClick={gotoScores}>
                <EmojiEvents />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="account circle" onClick={gotoProfiel}>
                <AccountCircle />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="account 
              circle" onClick={handleClick}>
              {/* onClick={gotoAdmin}> */}
                <Build />
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
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="account circle" onClick={gotoRegels}>
                <HelpOutline />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="log out" onClick={() => dispatch(userLogOut())} >
                <ExitToAppIcon />
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
       
      </AppBar>
    </div>
  );
}