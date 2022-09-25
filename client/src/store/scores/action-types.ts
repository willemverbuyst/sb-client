import { Action } from 'redux'
import { IScoresPlayer } from '../../models/player.model'
import {
  IFixtureWithPlayersWithScoreAndPrediction,
  IRoundWithPlayersWithScore,
  ITotalToto,
  ITotoRoundWithPlayersWithScore,
} from '../../models/scores.models'
import { ActionWithPayload } from '../types'

export enum ActionType {
  RESET_ALL_SCORES = 'RESET_ALL_SCORES ',
  RESET_SCORES_PLAYER = 'RESET_SCORES_PLAYER',
  STORE_SCORES_FIXTURE = 'STORE_SCORES_FIXTURE',
  STORE_SCORES_ROUND = 'STORE_SCORES_ROUND',
  STORE_SCORES_TOTAL_TOTO = 'STORE_SCORES_TOTAL_TOTO',
  STORE_SCORES_TOTO_ROUND = 'STORE_SCORES_TOTO_ROUND',
  STORE_PLAYER_SCORES = 'STORE_PLAYER_SCORES',
}

export type ResetAllScores = Action<ActionType.RESET_ALL_SCORES>

export type ResetScoresPlayer = Action<ActionType.RESET_SCORES_PLAYER>

export type StoreScoresFixture = ActionWithPayload<
  ActionType.STORE_SCORES_FIXTURE,
  IFixtureWithPlayersWithScoreAndPrediction
>

export type StoreScoresRound = ActionWithPayload<
  ActionType.STORE_SCORES_ROUND,
  IRoundWithPlayersWithScore
>

export type StoreScoresTotalToto = ActionWithPayload<
  ActionType.STORE_SCORES_TOTAL_TOTO,
  ITotalToto
>

export type StoreScoresTotoRound = ActionWithPayload<
  ActionType.STORE_SCORES_TOTO_ROUND,
  ITotoRoundWithPlayersWithScore
>

export type StorePlayerScores = ActionWithPayload<
  ActionType.STORE_PLAYER_SCORES,
  IScoresPlayer
>

export type ScoresActions =
  | ResetAllScores
  | ResetScoresPlayer
  | StoreScoresFixture
  | StoreScoresRound
  | StoreScoresTotalToto
  | StoreScoresTotoRound
  | StorePlayerScores
