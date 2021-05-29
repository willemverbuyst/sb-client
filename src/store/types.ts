import { AppState } from './appState/types';
import { IPlayersState } from './players/reducer';
import { PredictionsState } from './predictions/types';
import { ScoresState } from './scores/types';
import { TeamsState } from './teams/types';
import { UserState } from './user/types';

export type StoreState = {
  appState: AppState;
  playersState: IPlayersState;
  predictionsState: PredictionsState;
  scoresState: ScoresState;
  teamsState: TeamsState;
  userState: UserState;
};

export type GetState = () => StoreState;
