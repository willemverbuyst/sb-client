import { IAppState } from './appState/reducer'
import { IPlayersState } from './players/reducer'
import { IPredictionsState } from './predictions/reducer'
import { RulesState } from './rules/reducer'
import { IScoresState } from './scores/reducer'
import { ITeamsState } from './teams/reducer'
import { IUserState } from './user/reducer'

export type StoreState = {
  appState: IAppState
  playersState: IPlayersState
  predictionsState: IPredictionsState
  rulesState: RulesState
  scoresState: IScoresState
  teamsState: ITeamsState
  userState: IUserState
}

export type GetState = () => StoreState

export interface Action<T> {
  type: T
}

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P
}
