import { IPlayer, IPlayerProfile } from '../../models/player.model';
import { StoreState } from '../types';
import { ScoresPlayer } from './types';

export const selectPlayers = (state: StoreState): IPlayer[] | null => state.playersState.players;

export const selectPlayerProfile = (state: StoreState): IPlayerProfile | null => state.playersState.playerProfile;

export const selectPlayerScores = (state: StoreState): ScoresPlayer | null => state.playersState.scoresPlayer;
