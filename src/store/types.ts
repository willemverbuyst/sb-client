import { AppState } from './appState/types';
import { PlayersState } from './players/types';
import { PredictionsState } from './predictions/types';
import { ScoresState } from './scores/types';
import { TeamsState } from './teams/types';
import { UserState } from './user/types';

export type StoreState = {
  appState: AppState;
  playersState: PlayersState;
  predictionsState: PredictionsState;
  scoresState: ScoresState;
  teamsState: TeamsState;
  userState: UserState;
};

export type GetState = () => StoreState;
