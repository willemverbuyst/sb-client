import { Team } from '../teams/types';

export const ALL_PLAYERS_FETCHED = 'ALL_PLAYERS_FETCHED';
export const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';
export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';

export type AdminState = {
  players: Player[] | null;
};

export type Player = {
  admin: boolean;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  team: Team;
  totaalToto: boolean;
  userName: string;
};

export type AddNewPlayer = {
  type: typeof ADD_NEW_PLAYER;
  player: Player;
};

export type AllPlayersFetched = {
  type: typeof ALL_PLAYERS_FETCHED;
  players: Player[];
};

export type RemoveAllPlayers = {
  type: typeof REMOVE_ALL_PLAYERS;
};

export type AdminActionTypes =
  | AddNewPlayer
  | AllPlayersFetched
  | RemoveAllPlayers;
