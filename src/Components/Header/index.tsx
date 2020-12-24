import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { selectToken, selectUser } from '../../store/user/selectors';
import { userLogOut } from '../../store/user/actions';
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
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Group from '@material-ui/icons/Group';
import HelpOutline from '@material-ui/icons/HelpOutline';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
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

  const gotoLogin = () => {
    dispatch(userLogOut())
    history.push("/login")
  }

  const gotoMyScores = () =>  history.push("/mijnscores")

  const gotoPlayers = () => history.push("/spelers")

  const gotoPredictions = () => history.push("/voorspellingen/1/1");

  const gotoProfile = () => history.push("/profiel");

  const gotoProgram = () => history.push("/home");

  const gotoRules = () => history.push("/regels");

  const gotoSignUp = () => history.push("/admin/signup")

  const gotoTotalToto= () => history.push("/klassement/totaaltoto");
  
  return (
    <Box className={classes.header}>
      { token ? (
        <Toolbar>
          
          <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoProgram}>
            <Tooltip title="Programma" arrow>
              <Weekend />
            </Tooltip>
          </IconButton>
          
          <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoPredictions}>
            <Tooltip title="Voorspellingen" arrow>
              <SportsSoccerIcon />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoMyScores}>
            <Tooltip title="Scores" arrow>  
              <EmojiEvents />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoPlayers}>
            <Tooltip title="Spelers" arrow>
              <Group />
            </Tooltip>
          </IconButton>

          <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoTotalToto}>
            <Tooltip title="Klassement" arrow>
              <FormatListNumberedIcon />
            </Tooltip>
          </IconButton>
        
          { user && user.admin ? (
            <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu" onClick={gotoSignUp}>
              <Tooltip title="Sign up" arrow>
                <PersonAdd />
              </Tooltip>
            </IconButton>
          ) : ('')}   
             
          <IconButton 
            edge="start" 
            className={classes.icon} 
            color="inherit" 
            aria-label="account circle" 
            onClick={gotoProfile}
          >
            <Tooltip title="Profiel"  arrow>
              <Face />
            </Tooltip>
          </IconButton>
      
          <IconButton edge="start" className={classes.icon} color="inherit" aria-label="account circle" onClick={gotoRules}>
            <Tooltip title="Regels" arrow>
              <HelpOutline />
            </Tooltip>
          </IconButton>

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