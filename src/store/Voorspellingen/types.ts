import { SpeelRonde, TotoRonde } from '../../models/toto.models';

export const CURRENT_ROUND_FETCHED = 'GET_CURRENT_ROUND';
export const ALL_FIXTURES_FETCHED = 'ALL_FIXTURES_FETCHED';
export const POST_PREDICTION = 'POST_PREDICTION';
export const REMOVE_ALL_FIXTURES = 'REMOVE_ALL_FIXTURES';

export type VoorspellingenState = {
  currentRound: SpeelRonde | null;
  allFixtures: TotoRonde[] | null;
};

export type Prediction = {
  pGoalsAwayTeam: number;
  pGoalsHomeTeam: number;
  fixtureId: number;
};

export type CurrentRoundFetched = {
  type: typeof CURRENT_ROUND_FETCHED;
  currentRound: SpeelRonde;
};

export type AllFixturesFetched = {
  type: typeof ALL_FIXTURES_FETCHED;
  allFixtures: TotoRonde[];
};

export type PostPrediction = {
  type: typeof POST_PREDICTION;
  prediction: Prediction;
};

export type RemoveAllFixtures = {
  type: typeof REMOVE_ALL_FIXTURES;
};

export type VoorspellingenActionTypes =
  | CurrentRoundFetched
  | AllFixturesFetched
  | PostPrediction
  | RemoveAllFixtures;
