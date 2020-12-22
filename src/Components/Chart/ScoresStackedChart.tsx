import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { ScoresUser } from '../../store/user/types';

type Prop = {
  userScores: ScoresUser;
}

export default function ScoresStackedChart({userScores}: Prop) {

  const chartData = {
    labels: userScores.map((_totoround, i) => `TOTORONDE ${i + 1}`),
    datasets: [
      {
        stack: '',
        label: 'part1',
        data: userScores.map(totoRound => totoRound[0]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#1e5eb1',
        hoverBackgroundColor: '#EA9C3B',
      },
      {
        stack: '',
        label: 'part2',
        data: userScores.map(totoRound => totoRound[1]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#4f8ad8',
        hoverBackgroundColor: '#EA9C3B',
      },
      {
        stack: '',
        label: 'part3',
        data: userScores.map(totoRound => totoRound[2]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#99c3fa',
        hoverBackgroundColor: '#EA9C3B',
      },
      {
        stack: '',
        label: 'part4',
        data: userScores.map(totoRound => totoRound[3]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#c2d9f7',
        hoverBackgroundColor: '#EA9C3B',
      }
    ]
  }

  return (
    <Bar
      data={chartData}
      options={{
        tooltips: {
          enabled: true,  
          callbacks: {
            title: (tooltipItem, _chartData) => {
              let total = 0;
              for (let i = 0; i < chartData.datasets.length; i++) {
                typeof chartData.datasets[i].data[tooltipItem[0].index!] === 'number' 
                ? total += chartData.datasets[i].data[tooltipItem[0].index!]
                : total += 0
              }
              return `Totaal: ${total}`
            },
            label: (tooltipItem, _chartData) => {
              return `Scores: ${userScores[tooltipItem!.index!]}`
            }
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
                display: false,
                suggestedMin: 0,
              },
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
        },
        plugins: {
          datalabels: {
            display: false,
          }
        }
      }}
    />
  );
}