import { AppState } from './appState/types';
import { UserData } from './user/types';

export type StoreState = {
  userData: UserData;
  appState: AppState;
};

export type GetState = () => StoreState;
