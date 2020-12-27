import { IFixture } from '../../models/toto.models';

export const REMOVE_ALL_SCORES = 'REMOVE_ALL_SCORES';
export const SCORES_FIXTURE_FETCHED = 'SCORES_FIXTURE_FETCHED';
export const SCORES_ROUND_FETCHED = 'SCORES_ROUND_FETCHED';
export const SCORES_TOTAL_TOTO_FETCHED = 'SCORES_TOTAL_TOTO_FETCHED';
export const SCORES_TOTO_ROUND_FETCHED = 'SCORES_TOTO_ROUND_FETCHED';

export type ScoresState = {
  fixtureScores: FixtureWithScores | null;
  roundScores: Scores | null;
  totalTotoScores: UserWithScore[] | null;
  totoRoundScores: Scores | null;
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

export type Scores = {
  usersWithScores: UserWithScore[];
  id: number;
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

export type ScoresRoundFetched = {
  type: typeof SCORES_ROUND_FETCHED;
  round: Scores;
};

export type ScoresTotalTotoFetched = {
  type: typeof SCORES_TOTAL_TOTO_FETCHED;
  totalToto: UserWithScore[];
};

export type ScoresTotoRoundFetched = {
  type: typeof SCORES_TOTO_ROUND_FETCHED;
  totoRound: Scores;
};

export type ScoresActionTypes =
  | RemoveAllScores
  | ScoresFixtureFetched
  | ScoresRoundFetched
  | ScoresTotalTotoFetched
  | ScoresTotoRoundFetched;
