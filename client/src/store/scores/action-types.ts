import { IScoresPlayer } from '../../models/player.model'
import {
  IFixtureWithPlayersWithScoreAndPrediction,
  IRoundWithPlayersWithScore,
  ITotalToto,
  ITotoRoundWithPlayersWithScore,
} from '../../models/scores.models'

export enum ActionType {
  RESET_ALL_SCORES = 'RESET_ALL_SCORES ',
  RESET_SCORES_PLAYER = 'RESET_SCORES_PLAYER',
  STORE_SCORES_FIXTURE = 'STORE_SCORES_FIXTURE',
  STORE_SCORES_ROUND = 'STORE_SCORES_ROUND',
  STORE_SCORES_TOTAL_TOTO = 'STORE_SCORES_TOTAL_TOTO',
  STORE_SCORES_TOTO_ROUND = 'STORE_SCORES_TOTO_ROUND',
  STORE_PLAYER_SCORES = 'STORE_PLAYER_SCORES',
}

export type ResetAllScores = {
  type: ActionType.RESET_ALL_SCORES
}

export type ResetScoresPlayer = {
  type: ActionType.RESET_SCORES_PLAYER
}

export type StoreScoresFixture = {
  type: ActionType.STORE_SCORES_FIXTURE
  payload: IFixtureWithPlayersWithScoreAndPrediction
}

export type StoreScoresRound = {
  type: ActionType.STORE_SCORES_ROUND
  payload: IRoundWithPlayersWithScore
}

export type StoreScoresTotalToto = {
  type: ActionType.STORE_SCORES_TOTAL_TOTO
  payload: ITotalToto
}

export type StoreScoresTotoRound = {
  type: ActionType.STORE_SCORES_TOTO_ROUND
  payload: ITotoRoundWithPlayersWithScore
}

export type StorePlayerScores = {
  type: ActionType.STORE_PLAYER_SCORES
  payload: IScoresPlayer
}

export type ScoresActions =
  | ResetAllScores
  | ResetScoresPlayer
  | StoreScoresFixture
  | StoreScoresRound
  | StoreScoresTotalToto
  | StoreScoresTotoRound
  | StorePlayerScores
