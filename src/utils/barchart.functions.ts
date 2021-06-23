import { IUserWithScore, IUserWithScoreAndPrediction } from '../models/scores.models';
import { colorPrimary, colorSecondary } from '../ui/theme/chartColors';

export const displayUserScores = (scores: IUserWithScoreAndPrediction[]): number[] =>
  scores.map((player) => player.score + 0.1);

export const getBackgroundColorBars = <T extends IUserWithScore>(array: T[], userId: number | null): string[] =>
  array.map((a) => (a.userId === userId ? colorPrimary.color1 : colorSecondary.color1));

export const generateMaxForChartYAx = (arrayOfNumbers: number[], factor: number): number =>
  Math.max(...arrayOfNumbers) * factor;

export const getHoverBackgroundColorsBars = <T extends IUserWithScore>(array: T[]): string[] => array.map(() => 'grey');

export const getScoresOfAllPlayes = (scores: IUserWithScore[]): number[] => scores.map((player) => player.score);

export const getTotalsForStackedChart = (scores: number[][]): number[] =>
  scores.map((totoround) => totoround.reduce((a, b) => a + b));

export const getUserPredictions = (scores: IUserWithScoreAndPrediction[]): string[] =>
  scores.map((player) => `${player.pGoalsHomeTeam} - ${player.pGoalsAwayTeam}`);
