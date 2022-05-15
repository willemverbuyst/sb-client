import { ITeam } from './toto.models'

export interface IPlayer {
  admin: boolean
  email: string
  firstName: string
  id: string
  lastName: string
  phoneNumber: string
  team: ITeam
  totaalToto: boolean
  userName: string
}

export interface IScoresPlayer {
  userId: string
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
  userId: string
  name: string
  score: number
}

export interface IPlayerWithScoreAndPrediction extends IPlayerWithScore {
  pGoalsAwayTeam: number
  pGoalsHomeTeam: number
}
