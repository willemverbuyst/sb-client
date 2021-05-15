import { PredictionWithScorePerUser, UserWithScore } from '../store/scores/types';

export const sortValues = <T extends UserWithScore | PredictionWithScorePerUser>(arrayWithValues: T[]): T[] =>
  [...arrayWithValues].sort((value1, value2) => value1.user.toLowerCase().localeCompare(value2.user.toLowerCase()));
