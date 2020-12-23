import React from 'react';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { ScoresUser } from '../../store/user/types';

type Prop = {
  userScores: ScoresUser;
}

export default function ScoresStackedChart({userScores}: Prop) {
  const history = useHistory();

  const gotoTotoRound = (id: number) => 
  history.push(`/voorspellingen/${id}/${id * 3 - 2}`);

  const totals = userScores.map((totoround) => totoround.reduce((a, b)=> a + b))

  const chartData = {
    labels: userScores.map((_totoround, i) => `TOTORONDE ${i + 1}`),
    datasets: [
      {
        stack: '',
        label: 'part1',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: userScores.map(totoRound => totoRound[0] ? totoRound[0] : 0 ),
        backgroundColor: '#1e5eb1',
        hoverBackgroundColor: '#EA9C3B',
      },
      {
        stack: '',
        label: 'part2',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: userScores.map(totoRound => totoRound[1] ? totoRound[1] : 0 ),
        backgroundColor: '#4f8ad8',
        hoverBackgroundColor: '#EA9C3B',
      },
      {
        stack: '',
        label: 'part3',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: userScores.map(totoRound => totoRound[2] ? totoRound[2] : 0 ),
        backgroundColor: '#99c3fa',
        hoverBackgroundColor: '#EA9C3B',
      },
      {
        stack: '',
        label: 'part4',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: userScores.map(totoRound => totoRound[3] ? totoRound[3] : 0 ),
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
            title: (tooltipItem, _chartData) => `Scores: ${userScores[tooltipItem[0].index!]}`,
            label: (_tooltipItem, _chartData) => ``,
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
                display: false
              },
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
          xAxes: [
            {
              ticks: {
                display: true,
              },
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
        },
        plugins: {
          datalabels: {
            display: (ctx) =>  ctx.datasetIndex === 3,
            formatter: (_value, ctx) => totals[ctx.dataIndex],
            anchor: 'end',
            align: 'end',
            color: '#000',
          }
        }
      }}
      onElementsClick={(e) => {if (e[0] !== undefined ) gotoTotoRound(e[0]._index + 1 )}}
    />
  );
}