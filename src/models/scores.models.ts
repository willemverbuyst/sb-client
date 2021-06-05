import { IFixture } from './toto.models';

export interface IFixtureWithScores {
  fixture: IFixture;
  scores: IPredictionWithScorePerUser[] | null;
}

export interface IUserWithScore {
  id: number;
  score: number;
  user: string;
}

export interface IScores {
  usersWithScores: IUserWithScore[];
  id: number;
}

export interface IPredictionWithScorePerUser {
  pGoalsAwayTeam: number;
  pGoalsHomeTeam: number;
  score: number;
  user: string;
  userId: number;
}
