import { IUser } from '../../models/player.model';
import { StoreState } from '../types';

export const selectToken = (state: StoreState): string | null => state.userState.token;

export const selectUser = (state: StoreState): IUser | null => state.userState.user;
