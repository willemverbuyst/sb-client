import { StoreState } from '../types';

export const selectToken = (state: StoreState) => state.userState.token;

export const selectUser = (state: StoreState) => state.userState.user;
