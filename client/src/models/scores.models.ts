import { IPlayerWithScore, IPlayerWithScoreAndPrediction } from './player.model'
import { IFixture } from './toto.models'

export interface IFixtureWithPlayersWithScoreAndPrediction {
  fixture: IFixture
  scores: IPlayerWithScoreAndPrediction[]
}

export interface IRoundWithPlayersWithScore {
  roundId: number
  scores: IPlayerWithScore[]
}

export interface ITotoRoundWithPlayersWithScore {
  scores: IPlayerWithScore[]
  totoRoundId: number
}

export interface ITotalToto {
  scores: IPlayerWithScore[]
}
