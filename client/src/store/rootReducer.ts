import { combineReducers } from 'redux'

import appState from './appState/reducer'
import playersState from './players/reducer'
import predictionsState from './predictions/reducer'
import scoresState from './scores/reducer'
import teamsState from './teams/reducer'
import userState from './user/reducer'

export default combineReducers({
  appState,
  playersState,
  predictionsState,
  scoresState,
  teamsState,
  userState,
})
