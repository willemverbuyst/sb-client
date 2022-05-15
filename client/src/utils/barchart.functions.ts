import {
  IPlayerWithScore,
  IPlayerWithScoreAndPrediction,
} from '../models/player.model'
import { colorPrimary, colorSecondary } from '../theme/chartColors'

export const displayUserScores = (
  scores: IPlayerWithScoreAndPrediction[]
): number[] => scores.map((player) => player.score + 0.1)

export const getColorBars = <T extends IPlayerWithScore>(
  array: T[],
  userId: string | null
): string[] =>
  array.map((a) =>
    a.userId === userId ? colorPrimary.color1 : colorSecondary.color1
  )

export const generateMaxForChartYAx = (
  arrayOfNumbers: number[],
  factor: number
): number => Math.max(...arrayOfNumbers) * factor

export const getHoverColorsBars = <T extends IPlayerWithScore>(
  array: T[]
): string[] => array.map(() => 'grey')

export const getScoresOfAllPlayes = (scores: IPlayerWithScore[]): number[] =>
  scores.map((player) => player.score)

export const getTotalsForStackedChart = (scores: number[][]): number[] =>
  scores.map((totoround) => totoround.reduce((a, b) => a + b))

export const getUserPredictions = (
  scores: IPlayerWithScoreAndPrediction[]
): string[] =>
  scores.map((player) => `${player.pGoalsHomeTeam} - ${player.pGoalsAwayTeam}`)
