import { TotoRonde, ITeam } from '../../models/toto.models';

export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const ALL_PLAYERS_FETCHED = 'ALL_PLAYERS_FETCHED';
export const PLAYER_PROFILE_FETCHED = 'PLAYER_PROFILE_FETCHED';
export const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';

export type PlayersState = {
  players: Player[] | null;
  playerProfile: PlayerProfile | null;
};

export type Player = {
  admin: boolean;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  phoneNumber: string;
  team: ITeam;
  totaalToto: boolean;
  userName: string;
};

export type PlayerProfile = Player & {
  pastFixturesWithScores: TotoRonde[] | null;
};

export type AddNewPlayer = {
  type: typeof ADD_NEW_PLAYER;
  player: Player;
};

export type AllPlayersFetched = {
  type: typeof ALL_PLAYERS_FETCHED;
  players: Player[];
};

export type PlayerProfileFetched = {
  type: typeof PLAYER_PROFILE_FETCHED;
  playerProfile: PlayerProfile;
};

export type RemoveAllPlayers = {
  type: typeof REMOVE_ALL_PLAYERS;
};

export type PlayersActionTypes =
  | AddNewPlayer
  | AllPlayersFetched
  | PlayerProfileFetched
  | RemoveAllPlayers;
