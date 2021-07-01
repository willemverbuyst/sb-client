import { IUserWithScore, IUserWithScoreAndPrediction } from '../../models/scores.models';
import { colorPrimary, colorSecondary } from '../../ui/theme/chartColors';
import {
  displayUserScores,
  generateMaxForChartYAx,
  getBackgroundColorBars,
  getHoverBackgroundColorsBars,
  getScoresOfAllPlayes,
  getTotalsForStackedChart,
  getUserPredictions,
} from '../barchart.functions';

describe('#displayUserScores', () => {
  describe('if given an array with usersWithScoresandPrediction', () => {
    const usersWithScoreAndPrediction: IUserWithScoreAndPrediction[] = [
      {
        score: 5,
        user: 'Sifan',
        userId: 1,
        pGoalsHomeTeam: 2,
        pGoalsAwayTeam: 1,
      },
      {
        score: 0,
        user: 'Bolt',
        userId: 2,
        pGoalsHomeTeam: 2,
        pGoalsAwayTeam: 1,
      },
    ];

    test('returns a array with the scores plus 0.01', () => {
      expect(displayUserScores(usersWithScoreAndPrediction)).toEqual([5.1, 0.1]);
    });
  });
});

describe('#getBackgroundColorBars', () => {
  describe('if given an array with usersWithScores and an id', () => {
    const usersWithScoreOne: IUserWithScore[] = [
      {
        score: 5,
        user: 'Sifan',
        userId: 1,
      },
      {
        score: 0,
        user: 'Sifan',
        userId: 1,
      },
    ];
    const usersWithScoreTwo: IUserWithScore[] = [
      {
        score: 5,
        user: 'Bolt',
        userId: 2,
      },
      {
        score: 0,
        user: 'Bolt',
        userId: 2,
      },
    ];
    const usersWithScoreThree: IUserWithScore[] = [
      {
        score: 5,
        user: 'Sifan',
        userId: 1,
      },
      {
        score: 0,
        user: 'Bolt',
        userId: 2,
      },
    ];

    test('returns a array with colors for the charts', () => {
      expect(getBackgroundColorBars(usersWithScoreOne, 1)).toEqual([colorPrimary.color1, colorPrimary.color1]);
      expect(getBackgroundColorBars(usersWithScoreTwo, 1)).toEqual([colorSecondary.color1, colorSecondary.color1]);
      expect(getBackgroundColorBars(usersWithScoreThree, 1)).toEqual([colorPrimary.color1, colorSecondary.color1]);
      expect(getBackgroundColorBars(usersWithScoreThree, 1)).not.toEqual([
        colorSecondary.color1,
        colorSecondary.color1,
      ]);
    });
  });
});

describe('#generateMaxForChartYAx', () => {
  describe('if given an array of numbers and a factor', () => {
    test('returns the highest number in the array times the factor', () => {
      expect(generateMaxForChartYAx([0, 0], 2)).toEqual(0);
      expect(generateMaxForChartYAx([1, 2], 2)).toEqual(4);
      expect(generateMaxForChartYAx([1, 1], 2)).not.toEqual(1);
    });
  });
});

describe('#getHoverBackgroundColorsBars', () => {
  describe('if given an array with usersWithScores', () => {
    const usersWithScores: IUserWithScore[] = [
      {
        score: 5,
        user: 'Sifan',
        userId: 1,
      },
      {
        score: 0,
        user: 'Bolt',
        userId: 2,
      },
    ];

    test('returns a array with colors for the charts on hover', () => {
      expect(getHoverBackgroundColorsBars(usersWithScores)).toEqual(['grey', 'grey']);
    });
  });
});

describe('#getScoresOfAllPlayes', () => {
  describe('if given an array with usersWithScores', () => {
    const usersWithScores: IUserWithScore[] = [
      {
        score: 5,
        user: 'Sifan',
        userId: 1,
      },
      {
        score: 0,
        user: 'Bolt',
        userId: 2,
      },
    ];

    test('returns a array with the scores', () => {
      expect(getScoresOfAllPlayes(usersWithScores)).toEqual([5, 0]);
    });
  });
});

describe('#getTotalsForStackedChart', () => {
  describe('if given an array with arrays with scores', () => {
    const scores: number[][] = [
      [1, 2],
      [3, 4],
    ];

    test('returns a array with the scores totalled per array', () => {
      expect(getTotalsForStackedChart(scores)).toEqual([3, 7]);
    });
  });
});

describe('#getUserPredictions', () => {
  describe('if given an array with user with scores and predictions', () => {
    const usersWithScoreAndPrediction: IUserWithScoreAndPrediction[] = [
      {
        score: 5,
        user: 'Sifan',
        userId: 1,
        pGoalsHomeTeam: 2,
        pGoalsAwayTeam: 1,
      },
      {
        score: 0,
        user: 'Bolt',
        userId: 2,
        pGoalsHomeTeam: 8,
        pGoalsAwayTeam: 4,
      },
    ];

    test('returns a array with the predictions', () => {
      expect(getUserPredictions(usersWithScoreAndPrediction)).toEqual(['2 - 1', '8 - 4']);
    });
  });
});
