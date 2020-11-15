import { combineReducers } from 'redux';
import adminState from './admin/reducer';
import appState from './appState/reducer';
import userState from './user/reducer';
import teamsState from './teams/reducer';

export default combineReducers({
  adminState,
  appState,
  userState,
  teamsState,
});
