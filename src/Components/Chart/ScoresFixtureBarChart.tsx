import 'chartjs-plugin-datalabels';

import React, { ReactElement } from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { PredictionWithScorePerUser } from '../../store/scores/types';
import { selectUser } from '../../store/user/selectors';

type Props = {
  scores: PredictionWithScorePerUser[];
};

const ScoresFixtureBarChart: React.FC<Props> = ({ scores }: Props): ReactElement => {
  const history = useHistory();
  const labels = scores.map((player) => player.user.toLocaleUpperCase());
  const userScores = scores.map((player) => player.score + 0.1);
  const userPredictions = scores.map((player) => `${player.pGoalsHomeTeam} - ${player.pGoalsAwayTeam}`);
  const user = useSelector(selectUser);
  const max = Math.max(...userScores) * 1.2;

  const gotoPlayer = (id: number) => history.push(`/spelers/${scores[id].userId}/scores`);

  const hoverBackgroundColors = scores.map((score) => (score?.userId === user?.id ? '#1e5eb1' : '#aaa'));

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: userScores,
        backgroundColor: '#EA9C3B',
        borderWidth: 0,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
    tooltipItem: 'hello',
  };

  return (
    <Bar
      data={chartData}
      options={{
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
      }}
      onElementsClick={(e) => {
        if (e[0] !== undefined) gotoPlayer(e[0]._index);
      }}
    />
  );
};

export default ScoresFixtureBarChart;
