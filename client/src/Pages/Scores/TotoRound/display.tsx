import React, { ReactElement } from 'react'

import MessageComponent from '../../../Components/Communication/Message'
import ProgressComponent from '../../../Components/Progress'
import { IPlayerWithScore } from '../../../models/player.model'
import ScoresBarChart from '../../../Sections/Charts/ScoresBarChart'
import Pagination from './Pagination'

interface IProps {
  isLoading: boolean
  totoRound: number
  scoresRoundSortedByScore: IPlayerWithScore[] | null
}

const renderDisplay: React.FC<IProps> = ({
  isLoading,
  totoRound,
  scoresRoundSortedByScore,
}: IProps): ReactElement => {
  const renderProgressBar = () => <ProgressComponent />

  const renderChart = (scores: IPlayerWithScore[]) => (
    <>
      <Pagination totoRound={totoRound} />
      <ScoresBarChart scores={scores} />
    </>
  )

  const renderMessage = () => (
    <>
      <MessageComponent
        message={`Nog geen scores voor totoronde ${totoRound}`}
      />
      <Pagination totoRound={totoRound} />
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
