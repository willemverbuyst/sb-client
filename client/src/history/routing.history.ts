import history from './index'

export const gotoEditPassword = (): void => history.push('/profiel/password')

export const gotoForgotPassword = (): void => history.push('/forgotPassword')

export const gotoFixture = (id: number): void =>
  history.push(`/wedstrijd/${id}`)

export const gotoLogin = (): void => history.push('/login')

export const gotoPlayers = (): void => history.push('/spelers')

export const gotoPredictionsPlayer = (
  id: string | string,
  totoRoundNumber: number,
  roundNumber: number
): void =>
  history.push(
    `/spelers/${id}/voorspellingen/${totoRoundNumber}/${roundNumber}`
  )

export const gotoPredictionsUser = (
  totoRoundNumber: number,
  roundNumber: number
): void => history.push(`/voorspellingen/${totoRoundNumber}/${roundNumber}`)

export const gotoProfile = (): void => history.push('/profiel/edit')

export const gotoProgram = (): void => history.push('/programma')

export const gotoRankingRound = (roundNumber: number): void =>
  history.push(`/klassement/ronde/${roundNumber}`)

export const gotoRankingTotalToto = (): void =>
  history.push('/klassement/totaaltoto')

export const gotoRankingTotoRound = (totoRoundNumber: number): void =>
  history.push(`/klassement/totoronde/${totoRoundNumber}`)

export const gotoRules = (): void => history.push('/regels')

export const gotoScoresPlayer = (id: string): void =>
  history.push(`/spelers/${id}/scores`)

export const gotoScoresUser = (): void => history.push('/scores')

export const gotoSignUp = (): void => history.push('/signup')
