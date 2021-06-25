import BarChart from '@material-ui/icons/BarChart';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Face from '@material-ui/icons/Face';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import Group from '@material-ui/icons/Group';
import HelpOutline from '@material-ui/icons/HelpOutline';
import PersonAdd from '@material-ui/icons/PersonAdd';
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import Weekend from '@material-ui/icons/Weekend';
import React from 'react';

import * as HISTORY from '../../../history';

const iconStyles = {
  fontSize: '1.8rem',
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
};

export const navIconsRegular = [
  {
    label: 'program',
    goto: HISTORY.gotoProgram,
    icon: <Weekend style={iconStyles} />,
  },
  {
    label: 'prediction',
    goto: HISTORY.gotoPredictionsUser,
    icon: <SportsSoccerIcon style={iconStyles} />,
  },
  { label: 'my scores', goto: HISTORY.gotoScoresUser, icon: <BarChart style={iconStyles} /> },
  {
    label: 'total toto',
    goto: HISTORY.gotoRankingTotalToto,
    icon: <EmojiEvents style={iconStyles} />,
  },
  {
    label: 'toto round',
    goto: HISTORY.gotoRankingTotoRound,
    icon: <FormatListNumberedIcon style={iconStyles} />,
  },
  {
    label: 'round',
    goto: HISTORY.gotoRankingRound,
    icon: <FormatListNumberedRtlIcon style={iconStyles} />,
  },
  { label: 'players', goto: HISTORY.gotoPlayers, icon: <Group style={iconStyles} /> },
  {
    label: 'profile',
    goto: HISTORY.gotoProfile,
    icon: <Face style={iconStyles} />,
  },
  { label: 'rules', goto: HISTORY.gotoRules, icon: <HelpOutline style={iconStyles} /> },
  // { label: 'sign out', goto: { gotoLogin }, icon: <ExitToAppIcon style={iconStyles} /> },
];

const adminTasks = [
  {
    label: 'sign up',
    goto: HISTORY.gotoSignUp,
    icon: <PersonAdd style={iconStyles} />,
  },
];

const navIconRegularPartOne = navIconsRegular.slice(0, 7);
const navIconRegularPartTwo = navIconsRegular.slice(7, navIconsRegular.length);

export const navIconsAdmin = [...navIconRegularPartOne, ...adminTasks, ...navIconRegularPartTwo];
