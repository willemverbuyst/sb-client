import { AdminState } from './admin/types';
import { AppState } from './appState/types';
import { ScoresState } from './scores/types';
import { TeamsState } from './teams/types';
import { UserState } from './user/types';
import { VoorspellingenState } from './voorspellingen/types';

export type StoreState = {
  adminState: AdminState;
  appState: AppState;
  scoreState: ScoresState;
  teamsState: TeamsState;
  userState: UserState;
  voorspellingenState: VoorspellingenState;
};

export type GetState = () => StoreState;
