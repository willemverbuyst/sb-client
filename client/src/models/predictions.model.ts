import { TotoRound } from './toto.models'

export interface IPrediction {
  pGoalsAwayTeam: number
  pGoalsHomeTeam: number
  fixtureId: number
}

export interface IPlayerWithPredictions {
  player: string
  fixtures: TotoRound[]
}

export interface IPostedPrediction {
  prediction: IPrediction
}
export interface IUpdatedPrediction {
  prediction: IPrediction
}
