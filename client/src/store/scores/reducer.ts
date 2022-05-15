import { IScoresPlayer } from '../../models/player.model'
import {
  IFixtureWithPlayersWithScoreAndPrediction,
  IRoundWithPlayersWithScore,
  ITotalToto,
  ITotoRoundWithPlayersWithScore,
} from '../../models/scores.models'
import { ActionType, ScoresActions } from './action-types'

export interface IScoresState {
  fixtureWithScores: IFixtureWithPlayersWithScoreAndPrediction | null
  roundScores: IRoundWithPlayersWithScore | null
  totalTotoScores: ITotalToto | null
  totoRoundScores: ITotoRoundWithPlayersWithScore | null
  scoresPlayer: IScoresPlayer | null
}

const initialState: IScoresState = {
  fixtureWithScores: null,
  roundScores: null,
  totalTotoScores: null,
  totoRoundScores: null,
  scoresPlayer: null,
}

const scoresReducer = (
  state = initialState,
  action: ScoresActions
): IScoresState => {
  switch (action.type) {
    case ActionType.RESET_ALL_SCORES:
      return {
        fixtureWithScores: null,
        roundScores: null,
        totalTotoScores: null,
        totoRoundScores: null,
        scoresPlayer: null,
      }

    case ActionType.RESET_SCORES_PLAYER:
      return {
        ...state,
        scoresPlayer: null,
      }

    case ActionType.STORE_SCORES_FIXTURE:
      return { ...state, fixtureWithScores: action.payload }

    case ActionType.STORE_SCORES_ROUND:
      return { ...state, roundScores: action.payload }

    case ActionType.STORE_SCORES_TOTAL_TOTO:
      return { ...state, totalTotoScores: action.payload }

    case ActionType.STORE_SCORES_TOTO_ROUND:
      return { ...state, totoRoundScores: action.payload }

    case ActionType.STORE_PLAYER_SCORES:
      return { ...state, scoresPlayer: action.payload }

    default:
      return state
  }
}

export default scoresReducer
