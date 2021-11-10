import { ITeam } from './toto.models'

export interface IPlayer {
  admin: boolean
  email: string
  firstName: string
  id: number
  lastName: string
  phoneNumber: string
  team: ITeam
  totaalToto: boolean
  userName: string
}

export interface IScoresPlayer {
  id: number
  name: string
  scores: number[][]
}

export interface IAllPlayers {
  players: IPlayer[]
}

export interface INewPlayer {
  player: IPlayer
}

export interface IPlayerWithScore {
  id: number
  name: string
  score: number
}

export interface IPlayerWithScoreAndPrediction extends IPlayerWithScore {
  pGoalsAwayTeam: number
  pGoalsHomeTeam: number
}
