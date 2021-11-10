import { Severity } from './app.models'
import { IPlayer } from './player.model'
import { ICurrentRound } from './toto.models'

export interface IApiResponseUser {
  status: Severity
  data: {
    user: {
      profile: IPlayer
      currentRound?: ICurrentRound
    }
  }
  message?: string
  token: string
}

export interface IUpdatedUser {
  user: { profile: IPlayer }
}
