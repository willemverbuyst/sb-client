export const ALL_PLAYERS_FETCHED = 'ALL_PLAYERS_FETCHED';
export const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';

export type AdminState = {
  players: Player[] | null;
};

export type Player = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type AllPlayersFetched = {
  type: typeof ALL_PLAYERS_FETCHED;
  players: Player[];
};

export type RemoveAllPlayers = {
  type: typeof REMOVE_ALL_PLAYERS;
};

export type AdminActionTypes = AllPlayersFetched | RemoveAllPlayers;
