import React from 'react';
import { useHistory } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { UserWithScore } from '../../store/scores/types';

type Prop = {
  scores: UserWithScore[];
}

export default function ScoresStackedChart() {
  // const history = useHistory();
  // const labels = scores.map(player => player.user.toLocaleUpperCase());
  // const userScores = scores.map(player => player.score);
  // const max = Math.max(...userScores) * 1.2;

  // const gotoPlayer = (id: number) => 
  //   history.push(`/spelers/${scores[id].id}`);

const chartData = {
  labels: ['Ronde 1', 'Ronde 2', 'Ronde 3', 'Ronde 4', 'Ronde 5'],
  datasets: [
    // These two will be in the same stack.
    {
      stack: '',
      label: 'data1',
      data: [3, 2, 3, 4, 5],
      borderWidth: 2,
      borderColor: '#f1f1f1',
      backgroundColor:' #1e5eb1',
    },
    {
      stack: '',
      label: 'data2',
      data: [5, 4, 3, 2, 1],
      borderWidth: 2,
      borderColor: '#f1f1f1',
      backgroundColor:' #4f8ad8',
    },
    {
      stack: '',
      label: 'data3',
      data: [1, 2, 3, 3, 3],
      borderWidth: 2,
      borderColor: '#f1f1f1',
      backgroundColor:' #99c3fa',
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
                suggestedMax: 10,
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