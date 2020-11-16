export const SCORES_GAMES_FETCHED = 'SCORES_GAMES_FETCHED';
export const SCORES_MATCHES_FETCHED = 'SCORES_MATCHES_FETCHED';
export const SCORES_TOTO_FETCHED = 'SCORES_TOTO_FETCHED';

export type ScoresState = {
  games: Game[] | null;
  matches: Match[] | null;
  toto: Toto[] | null;
};

export type Game = {
  id: number;
  score: number;
  user: string;
};

export type Match = {
  fixture: Fixture[];
  scores: Score[];
};

export type Score = {
  pGoalsAwayTeam: number;
  pGoalsHomeTeam: number;
  score: number;
  user: string;
};

export type Fixture = {
  awayTeamId: number;
  awayTeamLogo: string;
  awayTeamName: string;
  createdAt: string;
  eventTimeStamp: number;
  goalsAwayTeam: number;
  goalsHomeTeam: number;
  homeTeamId: number;
  homeTeamLogo: number;
  homeTeamName: string;
  id: number;
  round: string;
  status: string;
  updatedAt: string;
};

export type Toto = {
  id: number;
  score: number;
  user: string;
};

export type ScoresGamesFetched = {
  type: typeof SCORES_GAMES_FETCHED;
  games: Game[];
};

export type ScoresMatchesFetched = {
  type: typeof SCORES_MATCHES_FETCHED;
  matches: Match[];
};

export type ScoresTotoFetched = {
  type: typeof SCORES_TOTO_FETCHED;
  toto: Toto[];
};

export type AdminActionTypes =
  | ScoresGamesFetched
  | ScoresMatchesFetched
  | ScoresTotoFetched;
