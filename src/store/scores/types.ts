import { IFixture } from '../../models/toto.models';

export const SCORES_FIXTURE_FETCHED = 'SCORES_FIXTURE_FETCHED';
export const SCORES_TOTO_ROUND_FETCHED = 'SCORES_TOTO_ROUND_FETCHED';

export type ScoresState = {
  fixtureScores: FixtureWithScores | null;
  totoRoundScores: UserWithTotoRoundScore[] | null;
};

export type FixtureWithScores = {
  fixture: IFixture;
  scores: PredictionWithScorePerUser[] | null;
};

export type UserWithTotoRoundScore = {
  id: number;
  score: number;
  user: string;
};

export type PredictionWithScorePerUser = {
  pGoalsAwayTeam: number;
  pGoalsHomeTeam: number;
  score: number;
  user: string;
  userId: number;
};

export type ScoresFixtureFetched = {
  type: typeof SCORES_FIXTURE_FETCHED;
  fixture: FixtureWithScores;
};

export type ScoresTotoRoundFetched = {
  type: typeof SCORES_TOTO_ROUND_FETCHED;
  totoRound: UserWithTotoRoundScore[];
};

export type ScoresActionTypes = ScoresFixtureFetched | ScoresTotoRoundFetched;
