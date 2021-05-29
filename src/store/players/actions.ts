import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';
import { ActionType } from './action-types';

export type AddNewPlayer = {
  type: ActionType.ADD_NEW_PLAYER;
  payload: IPlayer;
};

export type DeletePlayer = {
  type: ActionType.DELETE_PLAYER;
  payload: number;
};

export type FetchAllPlayers = {
  type: ActionType.FETCH_ALL_PLAYERS;
  payload: IPlayer[];
};

export type FetchPlayerProfile = {
  type: ActionType.FETCH_PLAYER_PROFILE;
  payload: IPlayerProfile;
};

export type FetchPlayerScores = {
  type: ActionType.FETCH_PLAYER_SCORES;
  payload: IScoresPlayer;
};

export type ResetPlayers = {
  type: ActionType.RESET_PLAYERS;
};

export type UpdateAdminStatus = {
  type: ActionType.UPDATE_ADMIN_STATUS;
  payload: IPlayer;
};

export type PlayersActionTypes =
  | AddNewPlayer
  | DeletePlayer
  | FetchAllPlayers
  | FetchPlayerProfile
  | FetchPlayerScores
  | ResetPlayers
  | UpdateAdminStatus;
