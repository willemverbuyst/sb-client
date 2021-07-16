import 'chartjs-plugin-datalabels';

import * as chartjs from 'chart.js';
import React, { ReactElement } from 'react';
import { ChartData } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import BarChart from '../../../Components/Chart/BarChart';
import * as HISTORY from '../../../history';
import { IUserWithScoreAndPrediction } from '../../../models/scores.models';
import { selectUserId } from '../../../store/user/selectors';
import * as UTILS from '../../../utils';

interface IProps {
  scores: IUserWithScoreAndPrediction[];
}

const ScoresForFixtureBarChart: React.FC<IProps> = ({
  scores,
}: IProps): ReactElement => {
  const userId: number | null = useSelector(selectUserId);
  const labels: string[] = UTILS.getStringsInUpperCase<
    keyof IUserWithScoreAndPrediction,
    IUserWithScoreAndPrediction
  >(scores, 'user');
  const userScores: number[] = UTILS.displayUserScores(scores);
  const max: number = UTILS.generateMaxForChartYAx(userScores, 1.2);
  const hoverBackgroundColors: string[] = UTILS.getHoverColorsBars<IUserWithScoreAndPrediction>(
    scores,
  );
  const backgroundColor: string[] = UTILS.getColorBars<IUserWithScoreAndPrediction>(
    scores,
    userId,
  );
  const userPredictions: string[] = UTILS.getUserPredictions(scores);
  const gotoScoresPlayer = (index: number): void => {
    const id: number = scores[index].userId;
    userId && userId === id
      ? HISTORY.gotoScoresUser()
      : HISTORY.gotoScoresPlayer(id);
  };

  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: userScores,
        backgroundColor: backgroundColor,
        borderWidth: 0,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  const chartOptions: chartjs.ChartOptions = {
    tooltips: {
      enabled: true,
      callbacks: {
        title: (tooltipItem) =>
          typeof tooltipItem[0].index === 'number'
            ? `Voorspelling: ${userPredictions[tooltipItem[0].index]}`
            : `Prediction ???`,
        label: () => '',
      },
    },
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            display: false,
            suggestedMin: 0,
            suggestedMax: max,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        display: true,
        color: 'black',
        formatter: (value) => `${value - 0.1}`,
      },
    },
  };

  return (
    <BarChart
      chartData={chartData}
      chartOptions={chartOptions}
      goto={gotoScoresPlayer}
    />
  );
};

export default ScoresForFixtureBarChart;
