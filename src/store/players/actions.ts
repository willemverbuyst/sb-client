import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';
import { ActionTypePlayers } from './action-types';

export type AddNewPlayer = {
  type: ActionTypePlayers.ADD_NEW_PLAYER;
  payload: IPlayer;
};

export type DeletePlayer = {
  type: ActionTypePlayers.DELETE_PLAYER;
  payload: number;
};

export type FetchAllPlayers = {
  type: ActionTypePlayers.FETCH_ALL_PLAYERS;
  payload: IPlayer[];
};

export type FetchPlayerProfile = {
  type: ActionTypePlayers.FETCH_PLAYER_PROFILE;
  payload: IPlayerProfile;
};

export type FetchPlayerScores = {
  type: ActionTypePlayers.FETCH_PLAYER_SCORES;
  payload: IScoresPlayer;
};

export type ResetPlayers = {
  type: ActionTypePlayers.RESET_PLAYERS;
};

export type UpdateAdminStatus = {
  type: ActionTypePlayers.UPDATE_ADMIN_STATUS;
  payload: IPlayer;
};

export type PlayersActions =
  | AddNewPlayer
  | DeletePlayer
  | FetchAllPlayers
  | FetchPlayerProfile
  | FetchPlayerScores
  | ResetPlayers
  | UpdateAdminStatus;
