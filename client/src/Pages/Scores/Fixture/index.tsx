import { Box } from '@material-ui/core'
import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import MessageComponent from '../../../Components/Communication/Message'
import DividerComponent from '../../../Components/Divider'
import ProgressComponent from '../../../Components/Progress'
import PageTitle from '../../../Components/Title/PageTitle'
import Guard from '../../../Sections/Guard'
import { selectAppLoading } from '../../../store/appState/selectors'
import { fetchScoresFixture } from '../../../store/scores/action-creators'
import {
  selectFixture,
  selectScoresForFixtureSortedByScore,
} from '../../../store/scores/selectors'
import { selectToken } from '../../../store/user/selectors'
import FixtureSection from './FixtureSection'
import ScoresForFixtureBarChart from './ScoresFixtureBarChart'

const Fixture: React.FC = (): ReactElement => {
  const dispatch = useDispatch()
  const fixture = useSelector(selectFixture)
  const isLoading = useSelector(selectAppLoading)
  const scoresFixtureSortedByScore = useSelector(
    selectScoresForFixtureSortedByScore
  )
  const token = useSelector(selectToken)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (token) {
      dispatch(fetchScoresFixture(Number(id)))
    }
  }, [dispatch, id])

  return (
    <Guard
      content={
        <Box>
          <PageTitle title="Uitslag" color="secondary" />
          {isLoading ? (
            <ProgressComponent />
          ) : fixture ? (
            <>
              <FixtureSection fixture={fixture} />
              <DividerComponent />
              {scoresFixtureSortedByScore ? (
                <ScoresForFixtureBarChart scores={scoresFixtureSortedByScore} />
              ) : (
                <MessageComponent message="Nog geen scores" />
              )}
            </>
          ) : (
            <MessageComponent message="Geen wedstrijd gevonden" />
          )}
        </Box>
      }
    />
  )
}

export default Fixture
