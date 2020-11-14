import { combineReducers } from 'redux';
import appState from './appState/reducer';
import userState from './user/reducer';

export default combineReducers({
  appState,
  userState,
});
