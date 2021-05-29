import { IAppState } from './appState/reducer';
import { IPlayersState } from './players/reducer';
import { PredictionsState } from './predictions/types';
import { ScoresState } from './scores/types';
import { TeamsState } from './teams/types';
import { UserState } from './user/types';

export type StoreState = {
  appState: IAppState;
  playersState: IPlayersState;
  predictionsState: PredictionsState;
  scoresState: ScoresState;
  teamsState: TeamsState;
  userState: UserState;
};

export type GetState = () => StoreState;
