import { Goal } from '../models/toto.models'
import { getTimeFromTimeStamp, hasBettingClosed } from './time.functions'

export const Display = {
  Private: 'private',
  Public: 'public',
} as const

export type Display = typeof Display[keyof typeof Display]

export interface PredictionGoals {
  pGoalsHomeTeam: Goal
  pGoalsAwayTeam: Goal
}

export interface Prediction extends PredictionGoals {
  status: string
  eventTimeStamp: number
  display: Display
  userNamePlayer: string
}

export type PredictionPrivate = Omit<Prediction, 'display' | 'userNamePlayer'>
export type PredictionPublic = Omit<Prediction, 'display' | 'eventTimeStamp'>

export type Outcome = {
  status: string
  goalsHomeTeam: Goal
  goalsAwayTeam: Goal
  eventTimeStamp: number
}

export const getTemporaryPrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
}: PredictionGoals): string =>
  Number.isInteger(pGoalsAwayTeam)
    ? ` [ ${pGoalsHomeTeam} - ${pGoalsAwayTeam} ] `
    : ' [ geen ] '

export const getPrivatePrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  status,
  eventTimeStamp,
}: PredictionPrivate): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) &&
  status === 'Match Finished'
    ? `Je voorspelling was ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? 'Geen voorspelling gedaan'
    : hasBettingClosed(eventTimeStamp)
    ? `Voorspelling${getTemporaryPrediction({
        pGoalsHomeTeam,
        pGoalsAwayTeam,
      })}gesloten`
    : Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)
    ? `Je voorspelling is ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : 'Nog geen voorspelling'

export const getPublicPrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  status,
  userNamePlayer,
}: PredictionPublic): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) &&
  status === 'Match Finished'
    ? `${userNamePlayer}'s voorspelling: ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? 'Geen voorspelling'
    : 'Wedstrijd nog niet gespeeld.'

export const getPrediction = ({
  pGoalsHomeTeam,
  pGoalsAwayTeam,
  status,
  eventTimeStamp,
  display,
  userNamePlayer,
}: Prediction): string =>
  display === Display.Private
    ? getPrivatePrediction({
        pGoalsHomeTeam,
        pGoalsAwayTeam,
        status,
        eventTimeStamp,
      })
    : getPublicPrediction({
        pGoalsHomeTeam,
        pGoalsAwayTeam,
        status,
        userNamePlayer,
      })

export const getOutCome = ({
  status,
  goalsHomeTeam,
  goalsAwayTeam,
  eventTimeStamp,
}: Outcome): string =>
  status === 'Time to be defined'
    ? 't.b.a.'
    : status === 'Match Finished'
    ? `${goalsHomeTeam} - ${goalsAwayTeam}`
    : `${getTimeFromTimeStamp(eventTimeStamp)}`
