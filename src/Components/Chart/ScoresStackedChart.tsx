import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { ScoresPlayer } from '../../store/players/types';
import { selectUser } from '../../store/user/selectors';

type Color = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
};

type Props = {
  scoresPlayer: ScoresPlayer;
  colorMain: Color;
  colorHover: Color;
  loggedInUser: boolean;
};

const ScoresStackedChart: React.FC<Props> = ({
  scoresPlayer,
  colorMain,
  colorHover,
  loggedInUser,
}: Props): ReactElement => {
  const history = useHistory();
  const user = useSelector(selectUser);

  let colorPrimary;
  let colorSecondary;

  if (!loggedInUser && user?.id === scoresPlayer.id) {
    colorPrimary = colorHover;
    colorSecondary = colorMain;
  } else {
    colorPrimary = colorMain;
    colorSecondary = colorHover;
  }

  const gotoTotoRound = (id: number) => {
    loggedInUser
      ? history.push(`/voorspellingen/${id}/${id * 3 - 2}`)
      : history.push(`/spelers/${scoresPlayer.id}/voorspellingen/${id}/${id * 3 - 2}`);
  };

  const totals = scoresPlayer.scores.map((totoround) => totoround.reduce((a, b) => a + b));
  const max = Math.max(...totals) * 1.2;

  const chartData = {
    labels: scoresPlayer.scores.map((_totoround, i) => `TOTORONDE ${i + 1}`),
    datasets: [
      {
        stack: '',
        label: 'part1',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map((totoRound) => (totoRound[0] ? totoRound[0] : 0)),
        backgroundColor: colorPrimary.color1,
        hoverBackgroundColor: colorSecondary.color1,
      },
      {
        stack: '',
        label: 'part2',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map((totoRound) => (totoRound[1] ? totoRound[1] : 0)),
        backgroundColor: colorPrimary.color2,
        hoverBackgroundColor: colorSecondary.color2,
      },
      {
        stack: '',
        label: 'part3',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map((totoRound) => (totoRound[2] ? totoRound[2] : 0)),
        backgroundColor: colorPrimary.color3,
        hoverBackgroundColor: colorSecondary.color3,
      },
      {
        stack: '',
        label: 'part4',
        borderWidth: 2,
        borderColor: '#f1f1f1',
        data: scoresPlayer.scores.map((totoRound) => (totoRound[3] ? totoRound[3] : 0)),
        backgroundColor: colorPrimary.color4,
        hoverBackgroundColor: colorSecondary.color4,
      },
    ],
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
                ? `Scores: ${scoresPlayer.scores[tooltipItem[0].index]}`
                : `Scores ???`,
            label: () => ``,
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
            display: (ctx) => ctx.datasetIndex === 3,
            formatter: (_value, ctx) => totals[ctx.dataIndex],
            anchor: 'end',
            align: 'end',
            color: '#000',
          },
        },
      }}
      onElementsClick={(e) => {
        if (e[0] !== undefined) gotoTotoRound(e[0]._index + 1);
      }}
    />
  );
};

export default ScoresStackedChart;
