import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';
import { StoreState } from '../types';

export const selectPlayers = (state: StoreState): IPlayer[] | null => state.playersState.players;

export const selectPlayerProfile = (state: StoreState): IPlayerProfile | null => state.playersState.playerProfile;

export const selectPlayerScores = (state: StoreState): IScoresPlayer | null => state.playersState.scoresPlayer;
