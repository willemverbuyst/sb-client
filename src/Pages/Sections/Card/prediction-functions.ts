import { hasBettingClosed } from '../../../utils/timeFunctions';

export const getPublicPrediction = (
  pGoalsHomeTeam: number | null,
  pGoalsAwayTeam: number | null,
  status: string,
): string =>
  (Number.isInteger(pGoalsHomeTeam) || Number.isInteger(pGoalsAwayTeam)) && status === 'Match Finished'
    ? `Voorspelling: ${pGoalsHomeTeam} - ${pGoalsAwayTeam}`
    : status === 'Match Finished'
    ? `Geen voorspelling`
    : `Wedstrijd nog niet gespeeld.`;

const getTemporaryPrediction = (pGoalsHomeTeam: number | null, pGoalsAwayTeam: number | null): string =>
  Number.isInteger(pGoalsAwayTeam) ? ` [ ${pGoalsHomeTeam} - ${pGoalsAwayTeam} ] ` : ` [ geen ] `;

export const getPrivatePrediction = (
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
