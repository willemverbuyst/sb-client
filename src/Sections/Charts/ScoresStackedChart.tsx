import 'chartjs-plugin-datalabels'

import * as chartjs from 'chart.js'
import React, { ReactElement } from 'react'
import { ChartData } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import BarChart from '../../Components/Chart/BarChart'
import * as HISTORY from '../../history'
import { IScoresPlayer } from '../../models/player.model'
import { selectUser } from '../../store/user/selectors'
import * as UTILS from '../../utils'

interface Color {
  color1: string
  color2: string
  color3: string
  color4: string
}

interface IProps {
  scoresPlayer: IScoresPlayer
  colorMain: Color
  colorHover: Color
  loggedInUser: boolean
}

const ScoresStackedChart: React.FC<IProps> = ({
  scoresPlayer,
  colorMain,
  colorHover,
  loggedInUser,
}: IProps): ReactElement => {
  const user = useSelector(selectUser)
  const { userId: playerId, scores } = scoresPlayer
  const colorPrimary =
    !loggedInUser && user && user.id === playerId ? colorHover : colorMain
  const gotoTotoRound = (index: number) => {
    const totoRoundNumber = index + 1
    const roundNumber = (index + 1) * 3 - 2

    if (loggedInUser) {
      HISTORY.gotoPredictionsUser(totoRoundNumber, roundNumber)
    } else {
      HISTORY.gotoPredictionsPlayer(playerId, totoRoundNumber, roundNumber)
    }
  }
  const totals: number[] = UTILS.getTotalsForStackedChart(scores)
  const max: number = UTILS.generateMaxForChartYAx(totals, 1.2)

  const chartData: ChartData<chartjs.ChartData> = {
    labels: scores.map(() => ''),
    datasets: [
      {
        stack: '',
        label: 'part1',
        data: scores.map((totoRound) => (totoRound[0] ? totoRound[0] : 0)),
        backgroundColor: colorPrimary.color1,
        hoverBackgroundColor: 'grey',
        barPercentage: 1,
      },
      {
        stack: '',
        label: 'part2',
        data: scores.map((totoRound) => (totoRound[1] ? totoRound[1] : 0)),
        backgroundColor: colorPrimary.color2,
        hoverBackgroundColor: 'grey',
        barPercentage: 1,
      },
      {
        stack: '',
        label: 'part3',
        data: scores.map((totoRound) => (totoRound[2] ? totoRound[2] : 0)),
        backgroundColor: colorPrimary.color3,
        hoverBackgroundColor: 'grey',
        barPercentage: 1,
      },
      {
        stack: '',
        label: 'part4',
        data: scores.map((totoRound) => (totoRound[3] ? totoRound[3] : 0)),
        backgroundColor: colorPrimary.color4,
        hoverBackgroundColor: 'grey',
        barPercentage: 1,
      },
    ],
  }

  const chartOptions: chartjs.ChartOptions = {
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
  }

  return (
    <BarChart
      chartData={chartData}
      chartOptions={chartOptions}
      goto={gotoTotoRound}
    />
  )
}

export default ScoresStackedChart
