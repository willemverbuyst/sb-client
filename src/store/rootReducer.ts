import { combineReducers } from 'redux';
import adminState from './admin/reducer';
import appState from './appState/reducer';
import scoresState from './scores/reducer';
import teamsState from './teams/reducer';
import userState from './user/reducer';
import voorspellingenState from './voorspellingen/reducer';

export default combineReducers({
  adminState,
  appState,
  scoresState,
  teamsState,
  userState,
  voorspellingenState,
});
