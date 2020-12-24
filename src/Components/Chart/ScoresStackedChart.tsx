import React from 'react';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { ScoresPlayer } from '../../store/players/types';

type Color = {
  color1: string, 
  color2: string, 
  color3: string, 
  color4: string;
}

type Prop = {
  scoresPlayer: ScoresPlayer;
  colorMain: Color;
  colorHover: Color;
  loggedInUser: boolean;
}

export default function ScoresStackedChart({scoresPlayer, colorMain, colorHover, loggedInUser}: Prop) {
  const history = useHistory();
  const colorPrimary = colorMain;
  const colorSecondary = colorHover;

  const gotoTotoRound = (id: number) => {
    loggedInUser ? history.push(`/voorspellingen/${id}/${id * 3 - 2}`)
      : history.push(`/spelers/${scoresPlayer.id}/voorspellingen/${id}/${id * 3 - 2}`)
  }


  const totals = scoresPlayer.scores.map((totoround) => totoround.reduce((a, b)=> a + b));

  const chartData = {
    labels: scoresPlayer.scores.map((_totoround, i) => `TOTORONDE ${i + 1}`),
    datasets: [
      {
        stack: '',
        label: 'part1',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map(totoRound => totoRound[0] ? totoRound[0] : 0 ),
        backgroundColor: colorPrimary.color1,
        hoverBackgroundColor: colorSecondary.color1,
      },
      {
        stack: '',
        label: 'part2',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map(totoRound => totoRound[1] ? totoRound[1] : 0 ),
        backgroundColor: colorPrimary.color2,
        hoverBackgroundColor: colorSecondary.color2,
      },
      {
        stack: '',
        label: 'part3',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map(totoRound => totoRound[2] ? totoRound[2] : 0 ),
        backgroundColor: colorPrimary.color3,
        hoverBackgroundColor: colorSecondary.color3,
      },
      {
        stack: '',
        label: 'part4',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map(totoRound => totoRound[3] ? totoRound[3] : 0 ),
        backgroundColor: colorPrimary.color4,
        hoverBackgroundColor: colorSecondary.color4,
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
            title: (tooltipItem, _chartData) => `Scores: ${scoresPlayer.scores[tooltipItem[0].index!]}`,
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