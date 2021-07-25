import { Severity } from './app.models';
import { IUser } from './player.model';
import { ICurrentRound } from './toto.models';

export interface IApiResponseUser {
  status: Severity;
  data: {
    user: {
      profile: IUser;
      currentRound?: ICurrentRound;
    };
  };
  message?: string;
  token: string;
}
