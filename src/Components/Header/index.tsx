import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { selectUser } from '../../store/user/selectors';
import { selectToken } from '../../store/user/selectors';
import { userLogOut } from '../../store/user/actions';
import ball from "../../assets/ball.png";

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
  const token = useSelector(selectToken);
  const user = useSelector(selectUser)

  // console.log(user)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        
          { token ? (
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="account circle">
                <AccountCircle />
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