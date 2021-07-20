import { IPlayer, IScoresPlayer } from '../../models/player.model';

export enum ActionType {
  ADD_NEW_PLAYER = 'UPDATE_PREDICTION',
  DELETE_PLAYER = 'DELETE_PLAYER',
  RESET_PLAYERS = 'RESET_PLAYERS',
  STORE_ALL_PLAYERS = 'STORE_ALL_PLAYERS',
  STORE_PLAYER_SCORES = 'STORE_PLAYER_SCORES',
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

export type StorePlayerScores = {
  type: ActionType.STORE_PLAYER_SCORES;
  payload: IScoresPlayer;
};

export type PlayersActions =
  | AddNewPlayer
  | DeletePlayer
  | ResetPlayers
  | StoreAllPlayers
  | StorePlayerScores;
