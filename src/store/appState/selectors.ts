import { StoreState } from '../types';
import { Message } from './types';

export const selectAppLoading = (state: StoreState): boolean => state.appState.loading;

export const selectMessage = (state: StoreState): Message | null => state.appState.message;
