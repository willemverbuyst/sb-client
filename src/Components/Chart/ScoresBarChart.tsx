import React from 'react';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { UserWithScore } from '../../store/scores/types';

type Prop = {
  scores: UserWithScore[];
}

export default function BarChart({ scores }: Prop) {
  const history = useHistory();
  const labels = scores.map(player => player.user.toLocaleUpperCase());
  const userScores = scores.map(player => player.score);
  const max = Math.max(...userScores) * 1.2;

  const gotoPlayer = (id: number) => 
    history.push(`/spelers/scores/${scores[id].id}`);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: userScores,
        backgroundColor:'#EA9C3B',
        borderWidth: 0,
        hoverBackgroundColor: '#1e5eb1',
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
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
             align:'top',
             display: true,
             color: 'black',
          }
        }
      }}
      onElementsClick={(e) => {if (e[0] !== undefined ) gotoPlayer(e[0]._index)}}
    />
  );
}