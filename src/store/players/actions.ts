import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';
import {
  ActionType,
  AddNewPlayer,
  DeletePlayer,
  ResetPlayers,
  StoreAllPlayers,
  StorePlayerProfile,
  StorePlayerScores,
  UpdateAdminStatus,
} from './action-types';

export const addNewPlayer = (player: IPlayer): AddNewPlayer => {
  return {
    type: ActionType.ADD_NEW_PLAYER,
    payload: player,
  };
};

export const storeAllPlayers = (players: IPlayer[]): StoreAllPlayers => {
  return {
    type: ActionType.STORE_ALL_PLAYERS,
    payload: players,
  };
};

export const deletePlayer = (playerId: number): DeletePlayer => {
  return {
    type: ActionType.DELETE_PLAYER,
    payload: playerId,
  };
};

export const storePlayerProfile = (playerProfile: IPlayerProfile): StorePlayerProfile => {
  return {
    type: ActionType.STORE_PLAYER_PROFILE,
    payload: playerProfile,
  };
};

export const storePlayerScores = (scoresPlayer: IScoresPlayer): StorePlayerScores => ({
  type: ActionType.STORE_PLAYER_SCORES,
  payload: scoresPlayer,
});

export const resetPlayers = (): ResetPlayers => {
  return {
    type: ActionType.RESET_PLAYERS,
  };
};

export const updateAdminStatus = (player: IPlayer): UpdateAdminStatus => {
  return {
    type: ActionType.UPDATE_ADMIN_STATUS,
    payload: player,
  };
};
