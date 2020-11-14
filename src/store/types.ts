import { AdminState } from './admin/types';
import { AppState } from './appState/types';
import { UserState } from './user/types';

export type StoreState = {
  adminState: AdminState;
  appState: AppState;
  userState: UserState;
};

export type GetState = () => StoreState;
