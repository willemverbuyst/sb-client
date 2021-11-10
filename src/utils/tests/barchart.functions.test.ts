import {
  IPlayerWithScore,
  IPlayerWithScoreAndPrediction,
} from '../../models/player.model'
import { colorPrimary, colorSecondary } from '../../theme/chartColors'
import {
  displayUserScores,
  generateMaxForChartYAx,
  getColorBars,
  getHoverColorsBars,
  getScoresOfAllPlayes,
  getTotalsForStackedChart,
  getUserPredictions,
} from '../barchart.functions'

describe('#displayUserScores', () => {
  describe('if given an array with usersWithScoresandPrediction', () => {
    const usersWithScoreAndPrediction: IPlayerWithScoreAndPrediction[] = [
      {
        score: 5,
        name: 'Sifan',
        id: 1,
        pGoalsHomeTeam: 2,
        pGoalsAwayTeam: 1,
      },
      {
        score: 0,
        name: 'Bolt',
        id: 2,
        pGoalsHomeTeam: 2,
        pGoalsAwayTeam: 1,
      },
    ]

    test('returns a array with the scores plus 0.01', () => {
      expect(displayUserScores(usersWithScoreAndPrediction)).toEqual([5.1, 0.1])
    })
  })
})

describe('#getColorBars', () => {
  describe('if given an array with usersWithScores and an id', () => {
    const usersWithScoreOne: IPlayerWithScore[] = [
      {
        score: 5,
        name: 'Sifan',
        id: 1,
      },
      {
        score: 0,
        name: 'Sifan',
        id: 1,
      },
    ]
    const usersWithScoreTwo: IPlayerWithScore[] = [
      {
        score: 5,
        name: 'Bolt',
        id: 2,
      },
      {
        score: 0,
        name: 'Bolt',
        id: 2,
      },
    ]
    const usersWithScoreThree: IPlayerWithScore[] = [
      {
        score: 5,
        name: 'Sifan',
        id: 1,
      },
      {
        score: 0,
        name: 'Bolt',
        id: 2,
      },
    ]

    test('returns a array with colors for the charts', () => {
      expect(getColorBars(usersWithScoreOne, 1)).toEqual([
        colorPrimary.color1,
        colorPrimary.color1,
      ])
      expect(getColorBars(usersWithScoreTwo, 1)).toEqual([
        colorSecondary.color1,
        colorSecondary.color1,
      ])
      expect(getColorBars(usersWithScoreThree, 1)).toEqual([
        colorPrimary.color1,
        colorSecondary.color1,
      ])
      expect(getColorBars(usersWithScoreThree, 1)).not.toEqual([
        colorSecondary.color1,
        colorSecondary.color1,
      ])
    })
  })
})

describe('#generateMaxForChartYAx', () => {
  describe('if given an array of numbers and a factor', () => {
    test('returns the highest number in the array times the factor', () => {
      expect(generateMaxForChartYAx([0, 0], 2)).toEqual(0)
      expect(generateMaxForChartYAx([1, 2], 2)).toEqual(4)
      expect(generateMaxForChartYAx([1, 1], 2)).not.toEqual(1)
    })
  })
})

describe('#getHoverColorsBars', () => {
  describe('if given an array with usersWithScores', () => {
    const usersWithScores: IPlayerWithScore[] = [
      {
        score: 5,
        name: 'Sifan',
        id: 1,
      },
      {
        score: 0,
        name: 'Bolt',
        id: 2,
      },
    ]

    test('returns a array with colors for the charts on hover', () => {
      expect(getHoverColorsBars(usersWithScores)).toEqual(['grey', 'grey'])
    })
  })
})

describe('#getScoresOfAllPlayes', () => {
  describe('if given an array with usersWithScores', () => {
    const usersWithScores: IPlayerWithScore[] = [
      {
        score: 5,
        name: 'Sifan',
        id: 1,
      },
      {
        score: 0,
        name: 'Bolt',
        id: 2,
      },
    ]

    test('returns a array with the scores', () => {
      expect(getScoresOfAllPlayes(usersWithScores)).toEqual([5, 0])
    })
  })
})

describe('#getTotalsForStackedChart', () => {
  describe('if given an array with arrays with scores', () => {
    const scores: number[][] = [
      [1, 2],
      [3, 4],
    ]

    test('returns a array with the scores totalled per array', () => {
      expect(getTotalsForStackedChart(scores)).toEqual([3, 7])
    })
  })
})

describe('#getUserPredictions', () => {
  describe('if given an array with user with scores and predictions', () => {
    const usersWithScoreAndPrediction: IPlayerWithScoreAndPrediction[] = [
      {
        score: 5,
        name: 'Sifan',
        id: 1,
        pGoalsHomeTeam: 2,
        pGoalsAwayTeam: 1,
      },
      {
        score: 0,
        name: 'Bolt',
        id: 2,
        pGoalsHomeTeam: 8,
        pGoalsAwayTeam: 4,
      },
    ]

    test('returns a array with the predictions', () => {
      expect(getUserPredictions(usersWithScoreAndPrediction)).toEqual([
        '2 - 1',
        '8 - 4',
      ])
    })
  })
})
