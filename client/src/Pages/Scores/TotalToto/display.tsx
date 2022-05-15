import React, { ReactElement } from 'react'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import { IPlayerWithScore } from '../../../models/player.model'
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart'

interface IProps {
  isLoading: boolean
  scoresTotalTotoSortedByScore: IPlayerWithScore[] | null
}

const renderDisplay: React.FC<IProps> = ({
  isLoading,
  scoresTotalTotoSortedByScore,
}: IProps): ReactElement => {
  const renderProgressBar = () => <ProgressComponent />

  const renderChart = (scores: IPlayerWithScore[]) => (
    <ScoresBarChart scores={scores} />
  )

  const renderMessage = () => (
    <MessageComponent message="Nog geen scores voor de totaalToto" />
  )

  if (isLoading) {
    return renderProgressBar()
  }
  if (scoresTotalTotoSortedByScore && scoresTotalTotoSortedByScore.length) {
    return renderChart(scoresTotalTotoSortedByScore)
  }
  return renderMessage()
}

export default renderDisplay
