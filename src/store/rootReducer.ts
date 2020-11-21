import { combineReducers } from 'redux';
import appState from './appState/reducer';
import playersState from './players/reducer';
import scoresState from './scores/reducer';
import teamsState from './teams/reducer';
import userState from './user/reducer';
import voorspellingenState from './voorspellingen/reducer';

export default combineReducers({
  appState,
  playersState,
  scoresState,
  teamsState,
  userState,
  voorspellingenState,
});
