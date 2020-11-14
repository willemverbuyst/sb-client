export const ALL_PLAYERS_FETCHED = 'ALL_PLAYERS_FETCHED';

export type AdminState = {
  players: Player[] | null;
};

export type GetAdminState = () => AdminState;

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

export type AdminActionTypes = AllPlayersFetched;
