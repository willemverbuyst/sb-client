export interface ITeam {
  id: number;
  name: string;
  logo: string;
}

export interface IWedstrijd {
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

export interface IWedstrijdMetScore extends IWedstrijd {
  score: string;
}

export interface IWedstrijdMetScoreEnVoorspellingen extends IWedstrijdMetScore {
  predictions: {
    pGoalsAwayTeam: number | null;
    pGoalsHomeTeam: number | null;
  };
}

export type SpeelRonde = IWedstrijdMetScoreEnVoorspellingen[];

export type TotoRonde = SpeelRonde[];
