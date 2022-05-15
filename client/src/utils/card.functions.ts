import { getTimeFromTimeStamp, hasBettingClosed } from './time.functions'

export const getTemporaryPrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null
): string =>
  Number.isInteger(pGoalsAwayTeam)
    ? ` [ ${pGoalsHomeTeam} - ${pGoalsAwayTeam} ] `
    : ' [ geen ] '

export const getPrivatePrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null,
  status: string,
  eventTimeStamp: number
): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) &&
  status === 'Match Finished'
    ? `Je voorspelling was ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? 'Geen voorspelling gedaan'
    : hasBettingClosed(eventTimeStamp)
    ? `Voorspelling${getTemporaryPrediction(
        pGoalsHomeTeam,
        pGoalsAwayTeam
      )}gesloten`
    : Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)
    ? `Je voorspelling is ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : 'Nog geen voorspelling'

export const getPublicPrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null,
  status: string,
  userNamePlayer: string
): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) &&
  status === 'Match Finished'
    ? `${userNamePlayer}'s voorspelling: ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? 'Geen voorspelling'
    : 'Wedstrijd nog niet gespeeld.'

export const getPrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null,
  status: string,
  eventTimeStamp: number,
  display: 'private' | 'public',
  userNamePlayer: string
): string =>
  display === 'private'
    ? getPrivatePrediction(
        pGoalsHomeTeam,
        pGoalsAwayTeam,
        status,
        eventTimeStamp
      )
    : getPublicPrediction(
        pGoalsHomeTeam,
        pGoalsAwayTeam,
        status,
        userNamePlayer
      )

export const getOutCome = (
  status: string,
  goalsHomeTeam: number | null,
  goalsAwayTeam: number | null,
  eventTimeStamp: number
): string =>
  status === 'Time to be defined'
    ? 't.b.a.'
    : status === 'Match Finished'
    ? `${goalsHomeTeam} - ${goalsAwayTeam}`
    : `${getTimeFromTimeStamp(eventTimeStamp)}`
