import { IPrediction } from '../../models/predictions.model';
import { Round, TotoRound } from '../../models/toto.models';

export const CURRENT_ROUND_FETCHED = 'GET_CURRENT_ROUND';
export const ALL_FIXTURES_FETCHED = 'ALL_FIXTURES_FETCHED';
export const POST_PREDICTION = 'POST_PREDICTION';
export const REMOVE_ALL_FIXTURES = 'REMOVE_ALL_FIXTURES';

export type VoorspellingenState = {
  currentRound: Round | null;
  allFixtures: TotoRound[] | null;
};

export type CurrentRoundFetched = {
  type: typeof CURRENT_ROUND_FETCHED;
  currentRound: Round;
};

export type AllFixturesFetched = {
  type: typeof ALL_FIXTURES_FETCHED;
  allFixtures: TotoRound[];
};

export type PostPrediction = {
  type: typeof POST_PREDICTION;
  prediction: IPrediction;
};

export type RemoveAllFixtures = {
  type: typeof REMOVE_ALL_FIXTURES;
};

export type VoorspellingenActionTypes =
  | CurrentRoundFetched
  | AllFixturesFetched
  | PostPrediction
  | RemoveAllFixtures;
