export const ALL_PLAYERS_FETCHED = 'ALL_PLAYERS_FETCHED';

export type AdminState = {
  players: Player[];
};

export type Player = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type FetchAllPlayers = {
  type: typeof ALL_PLAYERS_FETCHED;
  players: Player[];
};

export type AdminActionTypes = FetchAllPlayers;
