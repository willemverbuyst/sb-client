import history from './index';

export const gotoMyScores = (): void => history.push('/scores');

export const gotoPlayers = (): void => history.push('/spelers');

export const gotoPredictions = (totoRoundNumber: number, roundNumber: number): void =>
  history.push(`/voorspellingen/${totoRoundNumber}/${roundNumber}`);

export const gotoProfile = (): void => history.push('/profiel/edit');

export const gotoProgram = (): void => history.push('/programma');

export const gotoRound = (): void => history.push(`/klassement/ronde/1`);

export const gotoRoundPlayer = (id: string, value: number, t: number): void =>
  history.push(`/spelers/${id}/voorspellingen/${t}/${value}`);

export const gotoRules = (): void => history.push('/regels');

export const gotoScores = (totoRoundNumber: number): void => history.push(`/klassement/totoronde/${totoRoundNumber}`);

export const gotoSignUp = (): void => history.push('/signup');

export const gotoTotalToto = (): void => history.push('/klassement/totaaltoto');

export const gotoTotoRoundlayer = (id: string, value: number, r: number): void =>
  history.push(`/spelers/${id}/voorspellingen/${value}/${r}`);
