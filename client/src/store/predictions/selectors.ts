import {
  IFixtureWithScoreAndPredictions,
  TotoRound,
} from '../../models/toto.models'
import * as UTILS from '../../utils'
import { StoreState } from '../types'

export const selectAllPredictionsSortedByTime = (
  state: StoreState
): TotoRound[] | null => {
  if (
    state.predictionsState.allPredictions &&
    state.predictionsState.allPredictions.fixtures &&
    state.predictionsState.allPredictions.fixtures.length > 0
  ) {
    const allPredictions = state.predictionsState.allPredictions.fixtures
    const fixturesSortedByTime = allPredictions.map((totoRound) =>
      totoRound.map((round) =>
        UTILS.sortArrayWithObjects<
          keyof IFixtureWithScoreAndPredictions,
          IFixtureWithScoreAndPredictions
        >('eventTimeStamp')('ascending')(round)
      )
    )
    return fixturesSortedByTime
  }
  return null
}

export const selectNameOfPlayerOfPredicitons = (
  state: StoreState
): string | null =>
  state.predictionsState.allPredictions
    ? state.predictionsState.allPredictions.player
    : null
