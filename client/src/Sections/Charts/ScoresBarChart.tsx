import 'chartjs-plugin-datalabels'

import * as chartjs from 'chart.js'
import React, { ReactElement } from 'react'
import { ChartData } from 'react-chartjs-2'
import { useSelector } from 'react-redux'

import HorizontalBarChart from '../../Components/Chart/HorizontalBarChart'
import * as HISTORY from '../../history'
import { IPlayerWithScore } from '../../models/player.model'
import { selectUserId } from '../../store/user/selectors'
import * as UTILS from '../../utils'

interface IProps {
  scores: IPlayerWithScore[]
}

const ScoresBarChart: React.FC<IProps> = ({ scores }: IProps): ReactElement => {
  const userId: string | null = useSelector(selectUserId)
  const labels: string[] = UTILS.getStringsInUpperCase<
    keyof IPlayerWithScore,
    IPlayerWithScore
  >(scores, 'name')
  const scoresOfAllPlayes: number[] = UTILS.getScoresOfAllPlayes(scores)
  const hoverBackgroundColors: string[] =
    UTILS.getHoverColorsBars<IPlayerWithScore>(scores)
  const backgroundColor: string[] = UTILS.getColorBars<IPlayerWithScore>(
    scores,
    userId
  )
  const gotoScoresPlayer = (index: number): void => {
    const score = scores[index]

    if (userId && userId === score.userId) {
      HISTORY.gotoScoresUser()
    } else {
      HISTORY.gotoScoresPlayer(score.userId)
    }
  }

  const chartData: ChartData<chartjs.ChartData> = {
    labels,
    datasets: [
      {
        data: scoresOfAllPlayes,
        backgroundColor,
        borderWidth: 0,
        hoverBackgroundColor: hoverBackgroundColors,
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
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            display: true,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            display: false,
            suggestedMin: 0,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'start',
        display: true,
        color: '#f1f1f1',
      },
    },
  }

  return (
    <HorizontalBarChart
      chartData={chartData}
      chartOptions={chartOptions}
      goto={gotoScoresPlayer}
    />
  )
}

export default ScoresBarChart
