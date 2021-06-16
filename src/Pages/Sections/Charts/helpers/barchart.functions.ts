import { IUserWithScore } from '../../../../models/scores.models';
import { colorPrimary, colorSecondary } from '../../../../ui/theme/chartColors';

export const getBackgroundColorBars = <T extends IUserWithScore>(array: T[], userId?: number): string[] =>
  array.map((a) => (a.id === userId ? colorPrimary.color1 : colorSecondary.color1));

export const generateMaxYAxForChart = (arrayOfNumbers: number[], factor: number): number =>
  Math.max(...arrayOfNumbers) * factor;

export const getHoverBackgroundColorsBars = <T extends IUserWithScore>(array: T[], userId?: number): string[] =>
  array.map((a) => (a.id === userId ? colorPrimary.color2 : colorSecondary.color2));
