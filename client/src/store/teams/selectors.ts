import { ITeam, ITeamForSelector } from '../../models/toto.models'
import * as UTILS from '../../utils'
import { StoreState } from '../types'

export const selectTeams = (state: StoreState): ITeamForSelector[] | null => {
  if (state.teamsState.teams) {
    const { teams } = state.teamsState
    const sortedTeams = UTILS.sortArrayWithObjects<keyof ITeam, ITeam>('name')(
      'ascending'
    )(teams)
    const teamsForSelector = sortedTeams.map((team) => ({
      name: team.name,
      id: team.id,
    }))

    return teamsForSelector
  }
  return null
}
