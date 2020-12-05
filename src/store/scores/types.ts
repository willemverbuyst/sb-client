import { IFixture } from '../../models/toto.models';

export const SCORES_FIXTURE_FETCHED = 'SCORES_FIXTURE_FETCHED';

export type ScoresState = {
  fixture: Fixture | null;
};

export type Fixture = {
  fixture: IFixture;
  scores: PredictionWithScorePerUser[] | null;
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
  fixture: Fixture;
};

export type ScoresActionTypes = ScoresFixtureFetched;
