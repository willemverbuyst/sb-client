import { IAppState } from './appState/reducer';
import { IPlayersState } from './players/reducer';
import { IPredictionsState } from './predictions/reducer';
import { IScoresState } from './scores/reducer';
import { ITeamsState } from './teams/reducer';
import { UserState } from './user/types';

export type StoreState = {
  appState: IAppState;
  playersState: IPlayersState;
  predictionsState: IPredictionsState;
  scoresState: IScoresState;
  teamsState: ITeamsState;
  userState: UserState;
};

export type GetState = () => StoreState;
