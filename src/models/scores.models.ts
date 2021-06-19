import { IFixture } from './toto.models';

export interface IFixtureWithUsersWithScoreAndPrediction {
  fixture: IFixture;
  scores: IUserWithScoreAndPrediction[] | null;
}

export interface IUserWithScore {
  score: number;
  user: string;
  userId: number;
}

export interface IUserWithScoreAndPrediction extends IUserWithScore {
  pGoalsAwayTeam: number;
  pGoalsHomeTeam: number;
}

export interface IUsersWithScoreAndRoundId {
  usersWithScores: IUserWithScore[];
  roundId: number;
}

export interface IUsersWithScoreAndTotoRoundId {
  usersWithScores: IUserWithScore[];
  totoRoundId: number;
}
