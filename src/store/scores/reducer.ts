import {
  IFixtureWithUsersWithScoreAndPrediction,
  IUsersWithScoreAndRoundId,
  IUsersWithScoreAndTotoRoundId,
  IUserWithScore,
} from '../../models/scores.models';
import { ActionType, ScoresActions } from './action-types';

export interface IScoresState {
  fixtureWithScores: IFixtureWithUsersWithScoreAndPrediction | null;
  roundScores: IUsersWithScoreAndRoundId | null;
  totalTotoScores: IUserWithScore[] | null;
  totoRoundScores: IUsersWithScoreAndTotoRoundId | null;
}

const initialState: IScoresState = {
  fixtureWithScores: null,
  roundScores: null,
  totalTotoScores: null,
  totoRoundScores: null,
};

const scoresReducer = (
  state = initialState,
  action: ScoresActions,
): IScoresState => {
  switch (action.type) {
    case ActionType.RESET_ALL_SCORES:
      return {
        fixtureWithScores: null,
        roundScores: null,
        totalTotoScores: null,
        totoRoundScores: null,
      };

    case ActionType.STORE_SCORES_FIXTURE:
      return { ...state, fixtureWithScores: action.payload };

    case ActionType.STORE_SCORES_ROUND:
      return { ...state, roundScores: action.payload };

    case ActionType.STORE_SCORES_TOTAL_TOTO:
      return { ...state, totalTotoScores: action.payload };

    case ActionType.STORE_SCORES_TOTO_ROUND:
      return { ...state, totoRoundScores: action.payload };

    default:
      return state;
  }
};

export default scoresReducer;
