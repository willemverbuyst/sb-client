export interface ICurrentRound {
  fixtures: IFixtureWithScoreAndPredictions[]
  roundNumber: number
  totoRoundNumber: number
}

export interface IFixture {
  awayTeamId: number
  awayTeamLogo: string
  awayTeamName: string
  createdAt: string
  eventTimeStamp: number
  goalsAwayTeam: Goal
  goalsHomeTeam: Goal
  homeTeamId: number
  homeTeamLogo: string
  homeTeamName: string
  id: number
  round: string
  status: string
  updatedAt: string
}

export interface IFixtureWithScore extends IFixture {
  score: string
}

export interface IFixtureWithScoreAndPredictions extends IFixtureWithScore {
  predictions: {
    pGoalsAwayTeam: Goal
    pGoalsHomeTeam: Goal
  }
}

export interface ITeam {
  id: number
  name: string
  logo: string
}

export type ITeamForSelector = Omit<ITeam, 'logo'>

export interface IAllTeams {
  teams: ITeam[]
}

export type Round = IFixtureWithScoreAndPredictions[]

export type TotoRound = Round[]

export type Goal = number | null
