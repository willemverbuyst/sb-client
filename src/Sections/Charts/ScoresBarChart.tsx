import 'chartjs-plugin-datalabels';

import * as chartjs from 'chart.js';
import React, { ReactElement } from 'react';
import { ChartData } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import BarChart from '../../Components/Chart/BarChart';
import * as HISTORY from '../../history';
import { IPlayerWithScore } from '../../models/player.model';
import { selectUserId } from '../../store/user/selectors';
import * as UTILS from '../../utils';

interface IProps {
  scores: IPlayerWithScore[];
}

const ScoresBarChart: React.FC<IProps> = ({ scores }: IProps): ReactElement => {
  const userId: number | null = useSelector(selectUserId);
  const labels: string[] = UTILS.getStringsInUpperCase<
    keyof IPlayerWithScore,
    IPlayerWithScore
  >(scores, 'name');
  const scoresOfAllPlayes: number[] = UTILS.getScoresOfAllPlayes(scores);
  const max: number = UTILS.generateMaxForChartYAx(scoresOfAllPlayes, 1.2);
  const hoverBackgroundColors: string[] = UTILS.getHoverColorsBars<IPlayerWithScore>(
    scores,
  );
  const backgroundColor: string[] = UTILS.getColorBars<IPlayerWithScore>(
    scores,
    userId,
  );
  const gotoScoresPlayer = (index: number): void => {
    const id: number = scores[index].id;
    userId && userId === id
      ? HISTORY.gotoScoresUser()
      : HISTORY.gotoScoresPlayer(id);
  };

  const chartData: ChartData<chartjs.ChartData> = {
    labels: labels,
    datasets: [
      {
        data: scoresOfAllPlayes,
        backgroundColor: backgroundColor,
        borderWidth: 0,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  const chartOptions: chartjs.ChartOptions = {
    tooltips: {
      enabled: false,
    },
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
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

export default ScoresBarChart;
