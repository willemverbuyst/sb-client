import { IAppState } from './appState/reducer'
import { IPlayersState } from './players/reducer'
import { IPredictionsState } from './predictions/reducer'
import { IScoresState } from './scores/reducer'
import { ITeamsState } from './teams/reducer'
import { IUserState } from './user/reducer'

export type StoreState = {
  appState: IAppState
  playersState: IPlayersState
  predictionsState: IPredictionsState
  scoresState: IScoresState
  teamsState: ITeamsState
  userState: IUserState
}

export type GetState = () => StoreState
