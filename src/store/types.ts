import { AppState } from './appState/types';
import { UserState } from './user/types';

export type StoreState = {
  userState: UserState;
  appState: AppState;
};

export type GetState = () => StoreState;
