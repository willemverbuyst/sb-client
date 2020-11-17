export const CURRENT_ROUND_FETCHED = 'GET_CURRENT_ROUND';

export type VoorspellingenState = {
  currentRound: WedstrijdMetVoorspellingen[] | null;
};

export type WedstrijdMetVoorspellingen = {
  awayTeamId: number;
  awayTeamLogo: string;
  awayTeamName: string;
  createdAt: string;
  eventTimeStamp: number;
  goalsAwayTeam: number | null;
  goalsHomeTeam: number | null;
  homeTeamId: number;
  homeTeamLogo: string;
  homeTeamName: string;
  predictions: {
    pGoalsAwayTeam: number | null;
    pGoalsHomeTeam: number | null;
  };
  round: string;
  score: string;
  status: string;
  updatedAt: string;
};

export type CurrentRoundFetched = {
  type: typeof CURRENT_ROUND_FETCHED;
  currentRound: WedstrijdMetVoorspellingen[];
};

export type VoorspellingenActionTypes = CurrentRoundFetched;
