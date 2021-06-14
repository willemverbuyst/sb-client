import 'chartjs-plugin-datalabels';

import * as chartjs from 'chart.js';
import React, { ReactElement } from 'react';
import { ChartData } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import BarChart from '../../../Components/Chart/BarChart';
import { IUser } from '../../../models/player.model';
import { IPredictionWithScorePerUser } from '../../../models/scores.models';
import { selectUser } from '../../../store/user/selectors';

interface IProps {
  scores: IPredictionWithScorePerUser[];
}

const ScoresForFixtureBarChart: React.FC<IProps> = ({ scores }: IProps): ReactElement => {
  const history = useHistory();
  const labels: string[] = scores.map((player) => player.user.toLocaleUpperCase());
  const userScores: number[] = scores.map((player) => player.score + 0.1);
  const userPredictions: string[] = scores.map((player) => `${player.pGoalsHomeTeam} - ${player.pGoalsAwayTeam}`);
  const user: IUser | null = useSelector(selectUser);
  const max: number = Math.max(...userScores) * 1.2;
  const hoverBackgroundColors = scores.map((score) => (score?.userId === user?.id ? '#4f8ad8' : '#aaa'));

  const backgroundColor = scores.map((score) => (score.userId === user?.id ? '#1e5eb1' : '#EA9C3B'));

  const gotoPlayer = (id: number): void =>
    user && scores[id].userId === user.id
      ? history.push(`/scores`)
      : history.push(`/spelers/${scores[id].userId}/scores`);

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
