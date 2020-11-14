import { StoreState } from '../types';

export const selectToken = (state: StoreState) => state.adminState.players;
