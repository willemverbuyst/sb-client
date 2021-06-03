import { getTimeFromTimeStamp, hasBettingClosed } from '../../../utils/timeFunctions';

const getTemporaryPrediction = (pGoalsHomeTeam: number | null, pGoalsAwayTeam: number | null): string =>
  Number.isInteger(pGoalsAwayTeam) ? ` [ ${pGoalsHomeTeam} - ${pGoalsAwayTeam} ] ` : ` [ geen ] `;

const getPrivatePrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null,
  status: string,
  eventTimeStamp: number,
): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished'
    ? `Je voorspelling was ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? `Geen voorspelling gedaan`
    : hasBettingClosed(eventTimeStamp)
    ? `Voorspelling ${getTemporaryPrediction(pGoalsHomeTeam, pGoalsAwayTeam)} gesloten`
    : Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)
    ? `Je voorspelling is ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : `Nog geen voorspelling`;

const getPublicPrediction = (pGoalsHomeTeam: number | null, pGoalsAwayTeam: number | null, status: string): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished'
    ? `Voorspelling: ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? `Geen voorspelling`
    : `Wedstrijd nog niet gespeeld.`;

export const getPrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null,
  status: string,
  eventTimeStamp: number,
  display: 'private' | 'public',
): string =>
  display === 'private'
    ? getPrivatePrediction(pGoalsHomeTeam, pGoalsAwayTeam, status, eventTimeStamp)
    : getPublicPrediction(pGoalsHomeTeam, pGoalsAwayTeam, status);

export const getOutCome = (
  status: string,
  goalsHomeTeam: number | null,
  goalsAwayTeam: number | null,
  eventTimeStamp: number,
): string =>
  status === 'Time to be defined'
    ? `t.b.a.`
    : status === 'Match Finished'
    ? `${goalsHomeTeam} - ${goalsAwayTeam}`
    : `${getTimeFromTimeStamp(eventTimeStamp)}`;
