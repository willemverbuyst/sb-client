import { AppState } from './appState/types';
import { PlayersState } from './players/types';
import { ScoresState } from './scores/types';
import { TeamsState } from './teams/types';
import { UserState } from './user/types';
import { VoorspellingenState } from './voorspellingen/types';

export type StoreState = {
  appState: AppState;
  playersState: PlayersState;
  scoresState: ScoresState;
  teamsState: TeamsState;
  userState: UserState;
  voorspellingenState: VoorspellingenState;
};

export type GetState = () => StoreState;
