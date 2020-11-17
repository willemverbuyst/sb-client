import { AdminState } from './admin/types';
import { AppState } from './appState/types';
import { UserState } from './user/types';
import { TeamsState } from './teams/types';
import { VoorspellingenState } from './voorspellingen/types';

export type StoreState = {
  adminState: AdminState;
  appState: AppState;
  userState: UserState;
  teamsState: TeamsState;
  voorspellingenState: VoorspellingenState;
};

export type GetState = () => StoreState;
