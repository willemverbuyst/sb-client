import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';

export enum ActionType {
  ADD_NEW_PLAYER = 'add new player',
  DELETE_PLAYER = 'delete player',
  RESET_PLAYERS = 'reset players',
  STORE_ALL_PLAYERS = 'store all players',
  STORE_PLAYER_PROFILE = 'store player profile',
  STORE_PLAYER_SCORES = 'store player scores',
  UPDATE_ADMIN_STATUS = 'update admin status',
}

export type AddNewPlayer = {
  type: ActionType.ADD_NEW_PLAYER;
  payload: IPlayer;
};

export type DeletePlayer = {
  type: ActionType.DELETE_PLAYER;
  payload: number;
};

export type ResetPlayers = {
  type: ActionType.RESET_PLAYERS;
};

export type StoreAllPlayers = {
  type: ActionType.STORE_ALL_PLAYERS;
  payload: IPlayer[];
};

export type StorePlayerProfile = {
  type: ActionType.STORE_PLAYER_PROFILE;
  payload: IPlayerProfile;
};

export type StorePlayerScores = {
  type: ActionType.STORE_PLAYER_SCORES;
  payload: IScoresPlayer;
};

export type UpdateAdminStatus = {
  type: ActionType.UPDATE_ADMIN_STATUS;
  payload: IPlayer;
};

export type PlayersActions =
  | AddNewPlayer
  | DeletePlayer
  | ResetPlayers
  | StoreAllPlayers
  | StorePlayerProfile
  | StorePlayerScores
  | UpdateAdminStatus;
