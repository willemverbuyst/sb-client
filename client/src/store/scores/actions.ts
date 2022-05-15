import { IScoresPlayer } from '../../models/player.model'
import {
  IFixtureWithPlayersWithScoreAndPrediction,
  IRoundWithPlayersWithScore,
  ITotalToto,
  ITotoRoundWithPlayersWithScore,
} from '../../models/scores.models'
import {
  ActionType,
  ResetAllScores,
  ResetScoresPlayer,
  StorePlayerScores,
  StoreScoresFixture,
  StoreScoresRound,
  StoreScoresTotalToto,
  StoreScoresTotoRound,
} from './action-types'

export const resetAllScores = (): ResetAllScores => ({
  type: ActionType.RESET_ALL_SCORES,
})

export const resetScoresPlayer = (): ResetScoresPlayer => ({
  type: ActionType.RESET_SCORES_PLAYER,
})

export const storeScoresFixture = (
  fixtureWithScores: IFixtureWithPlayersWithScoreAndPrediction
): StoreScoresFixture => ({
  type: ActionType.STORE_SCORES_FIXTURE,
  payload: fixtureWithScores,
})

export const storeScoresRound = (
  round: IRoundWithPlayersWithScore
): StoreScoresRound => ({
  type: ActionType.STORE_SCORES_ROUND,
  payload: round,
})

export const storeScoresTotalToto = (
  totalToto: ITotalToto
): StoreScoresTotalToto => ({
  type: ActionType.STORE_SCORES_TOTAL_TOTO,
  payload: totalToto,
})

export const storeScoresTotoRound = (
  totoRound: ITotoRoundWithPlayersWithScore
): StoreScoresTotoRound => ({
  type: ActionType.STORE_SCORES_TOTO_ROUND,
  payload: totoRound,
})

export const storePlayerScores = (
  scoresPlayer: IScoresPlayer
): StorePlayerScores => ({
  type: ActionType.STORE_PLAYER_SCORES,
  payload: scoresPlayer,
})
