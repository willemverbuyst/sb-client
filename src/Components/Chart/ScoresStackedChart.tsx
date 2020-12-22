import React from 'react';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { ScoresUser } from '../../store/user/types';

type Prop = {
  userScores: ScoresUser;
}

export default function ScoresStackedChart({userScores}: Prop) {
  // const history = useHistory();
  // const gotoPlayer = (id: number) => 
  //   history.push(`/spelers/${scores[id].id}`);

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
      },
      {
        stack: '',
        label: 'part2',
        data: userScores.map(totoRound => totoRound[1]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#4f8ad8',
      },
      {
        stack: '',
        label: 'part3',
        data: userScores.map(totoRound => totoRound[2]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#99c3fa',
      },
      {
        stack: '',
        label: 'part4',
        data: userScores.map(totoRound => totoRound[3]),
        borderWidth: 2,
        borderColor: '#f1f1f1',
        backgroundColor: '#c2d9f7',
      }
    ]
  }

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
        // plugins: {
        //   datalabels: {
        //      anchor: 'end',
        //      align:'top',
        //      display: true,
        //      color: 'black',
        //   }
        // }
      }}
      // onElementsClick={(e) => {if (e[0] !== undefined ) gotoPlayer(e[0]._index)}}
    />
  );
}