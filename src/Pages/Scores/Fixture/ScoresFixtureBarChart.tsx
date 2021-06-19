import 'chartjs-plugin-datalabels';

import * as chartjs from 'chart.js';
import React, { ReactElement } from 'react';
import { ChartData } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import BarChart from '../../../Components/Chart/BarChart';
import { IUser } from '../../../models/player.model';
import { IUserWithScoreAndPrediction } from '../../../models/scores.models';
import { selectUser } from '../../../store/user/selectors';
import { getStringsInUpperCase } from '../../../utils/stringFunctions';

interface IProps {
  scores: IUserWithScoreAndPrediction[];
}

const ScoresForFixtureBarChart: React.FC<IProps> = ({ scores }: IProps): ReactElement => {
  const history = useHistory();
  const user: IUser | null = useSelector(selectUser);

  const labels: string[] = getStringsInUpperCase<keyof IUserWithScoreAndPrediction, IUserWithScoreAndPrediction>(
    scores,
    'user',
  );

  const userScores: number[] = scores.map((player) => player.score + 0.1);
  const max: number = Math.max(...userScores) * 1.2;

  const hoverBackgroundColors = scores.map(() => 'grey');
  const backgroundColor = scores.map((score) => (score.userId === user?.id ? '#1e5eb1' : '#EA9C3B'));

  const userPredictions: string[] = scores.map((player) => `${player.pGoalsHomeTeam} - ${player.pGoalsAwayTeam}`);

  const gotoPlayer = (index: number): void => {
    return user && scores[index].userId === user.id
      ? history.push(`/scores`)
      : history.push(`/spelers/${scores[index].userId}/scores`);
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

  return <BarChart chartData={chartData} chartOptions={chartOptions} goto={gotoPlayer} />;
};

export default ScoresForFixtureBarChart;
