import { ITeam, TotoRound } from './toto.models';

export interface IPlayer {
  admin: boolean;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  team: ITeam;
  totaalToto: boolean;
  userName: string;
}

export interface IPlayerProfile extends IPlayer {
  pastFixturesWithScores: TotoRound[] | null;
}

export interface IScoresPlayer {
  scores: number[][];
  userName: string;
  userId: number;
}

export interface IUser extends IPlayer {
  token: string;
}
