import { IFixture } from '../../models/toto.models';

export const REMOVE_ALL_SCORES = 'REMOVE_ALL_SCORES';
export const SCORES_FIXTURE_FETCHED = 'SCORES_FIXTURE_FETCHED';
export const SCORES_TOTAL_TOTO_FETCHED = 'SCORES_TOTAL_TOTO_FETCHED';
export const SCORES_TOTO_ROUND_FETCHED = 'SCORES_TOTO_ROUND_FETCHED';

export type ScoresState = {
  fixtureScores: FixtureWithScores | null;
  totalTotoScores: UserWithScore[] | null;
  totoRoundScores: UserWithScore[] | null;
};

export type FixtureWithScores = {
  fixture: IFixture;
  scores: PredictionWithScorePerUser[] | null;
};

export type UserWithScore = {
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

export type RemoveAllScores = {
  type: typeof REMOVE_ALL_SCORES;
};

export type ScoresFixtureFetched = {
  type: typeof SCORES_FIXTURE_FETCHED;
  fixture: FixtureWithScores;
};

export type ScoresTotalTotoFetched = {
  type: typeof SCORES_TOTAL_TOTO_FETCHED;
  totalToto: UserWithScore[];
};

export type ScoresTotoRoundFetched = {
  type: typeof SCORES_TOTO_ROUND_FETCHED;
  totoRound: UserWithScore[];
};

export type ScoresActionTypes =
  | RemoveAllScores
  | ScoresFixtureFetched
  | ScoresTotalTotoFetched
  | ScoresTotoRoundFetched;
