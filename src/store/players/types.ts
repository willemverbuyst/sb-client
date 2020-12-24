import { IPlayer, IPlayerProfile } from '../../models/player.model';

export const ADD_NEW_PLAYER = 'ADD_NEW_PLAYER';
export const ALL_PLAYERS_FETCHED = 'ALL_PLAYERS_FETCHED';
export const PLAYER_PROFILE_FETCHED = 'PLAYER_PROFILE_FETCHED';
export const PLAYER_SCORES_FETCHED = 'PLAYER_SCORES_FETCHED';
export const REMOVE_ALL_PLAYERS = 'REMOVE_ALL_PLAYERS';

export type PlayersState = {
  players: IPlayer[] | null;
  playerProfile: IPlayerProfile | null;
  scores: ScoresPlayer | null;
};

export type ScoresPlayer = number[][];

export type AddNewPlayer = {
  type: typeof ADD_NEW_PLAYER;
  player: IPlayer;
};

export type AllPlayersFetched = {
  type: typeof ALL_PLAYERS_FETCHED;
  players: IPlayer[];
};

export type PlayerProfileFetched = {
  type: typeof PLAYER_PROFILE_FETCHED;
  playerProfile: IPlayerProfile;
};

export type PlayerScoresFetched = {
  type: typeof PLAYER_SCORES_FETCHED;
  scores: ScoresPlayer;
};

export type RemoveAllPlayers = {
  type: typeof REMOVE_ALL_PLAYERS;
};

export type PlayersActionTypes =
  | AddNewPlayer
  | AllPlayersFetched
  | PlayerProfileFetched
  | PlayerScoresFetched
  | RemoveAllPlayers;
