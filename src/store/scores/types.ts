import { IWedstrijd } from '../../models/toto.models';

export const SCORES_GAMES_FETCHED = 'SCORES_GAMES_FETCHED';
export const SCORES_MATCH_FETCHED = 'SCORES_MATCH_FETCHED';
export const SCORES_TOTO_FETCHED = 'SCORES_TOTO_FETCHED';

export type ScoresState = {
  match: Match | null;
};

export type Match = {
  fixture: IWedstrijd;
  scores: PredictionWithScorePerUser[] | null;
};

export type PredictionWithScorePerUser = {
  pGoalsAwayTeam: number;
  pGoalsHomeTeam: number;
  score: number;
  user: string;
  userId: number;
};

export type ScoresMatchFetched = {
  type: typeof SCORES_MATCH_FETCHED;
  match: Match;
};

export type ScoresActionTypes = ScoresMatchFetched;
