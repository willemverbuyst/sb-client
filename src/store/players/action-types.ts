import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';

export enum ActionType {
  ADD_NEW_PLAYER,
  DELETE_PLAYER,
  RESET_PLAYERS,
  STORE_ALL_PLAYERS,
  STORE_PLAYER_PROFILE,
  STORE_PLAYER_SCORES,
  UPDATE_ADMIN_STATUS,
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
