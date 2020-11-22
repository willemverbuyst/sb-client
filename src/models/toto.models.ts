export interface ITeam {
  id: number;
  name: string;
  logo: string;
}

export interface IFixture {
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
  id: number;
  round: string;
  status: string;
  updatedAt: string;
}

export interface IFixtureWithScore extends IFixture {
  score: string;
}

export interface IFixtureWithScoreAndPredictions extends IFixtureWithScore {
  predictions: {
    pGoalsAwayTeam: number | null;
    pGoalsHomeTeam: number | null;
  };
}

export type Round = IFixtureWithScoreAndPredictions[];

export type TotoRound = Round[];
