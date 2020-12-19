import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { UserWithScore } from '../../store/scores/types';

type Prop = {
  totoRound: UserWithScore[];
}

export default function BarChart({ totoRound }: Prop) {
  const labels = totoRound.map(player => player.user.toLocaleUpperCase())
  const scores = totoRound.map(player => player.score)
  const max = Math.max(...scores) * 1.2

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: scores,
        backgroundColor:' #EA9C3B',
        borderWidth: 0,
        hoverBackgroundColor: '#888',
      },
    ],
  };

  return (
    <Bar
      data={chartData}
      options={{
        tooltips: { enabled: false },
        legend: {
          display: false,
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
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
    />
  );
}