import { AppState } from './types';

export const selectAppLoading = (state: AppState) => state.loading;

export const selectMessage = (state: AppState) => state.message;
