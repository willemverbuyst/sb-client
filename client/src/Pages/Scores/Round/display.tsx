import React, { ReactElement } from 'react'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import { IPlayerWithScore } from '../../../models/player.model'
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart'
import Pagination from './Pagination'

interface IProps {
  isLoading: boolean
  round: number
  scoresRoundSortedByScore: IPlayerWithScore[] | null
}

const renderDisplay: React.FC<IProps> = ({
  isLoading,
  round,
  scoresRoundSortedByScore,
}: IProps): ReactElement => {
  const renderProgressBar = () => <ProgressComponent />

  const renderChart = (scores: IPlayerWithScore[]) => (
    <>
      <Pagination round={round} />
      <ScoresBarChart scores={scores} />
    </>
  )

  const renderMessage = () => (
    <>
      <MessageComponent message={`Nog geen scores voor speelronde ${round}`} />
      <Pagination round={round} />
    </>
  )

  if (isLoading) {
    return renderProgressBar()
  }
  if (scoresRoundSortedByScore && scoresRoundSortedByScore.length) {
    return renderChart(scoresRoundSortedByScore)
  }
  return renderMessage()
}

export default renderDisplay
