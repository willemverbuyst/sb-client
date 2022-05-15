import { IAllTeams, ITeam } from '../../../models/toto.models'
import { ActionType } from '../action-types'
import reducer, { ITeamsState } from '../reducer'

describe('#teamsReducer', () => {
  describe('w/ initial state and STORE_ALL_TEAMS action type', () => {
    const initialState: ITeamsState = {
      teams: null,
    }
    const allTeams: IAllTeams = {
      teams: [
        {
          id: 1,
          name: 'test_name',
          logo: 'test_logo',
        },
      ],
    }
    const newState: ITeamsState = reducer(initialState, {
      type: ActionType.STORE_ALL_TEAMS,
      payload: allTeams,
    })

    test('returns the new state with teams', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState).toEqual(allTeams)
      expect(newState.teams?.length).toBe(1)
    })
  })

  describe('w/ initial state and STORE_ALL_TEAMS action type and no teams', () => {
    const initialState: ITeamsState = {
      teams: null,
    }
    const newState: ITeamsState = reducer(initialState, {
      type: ActionType.STORE_ALL_TEAMS,
      payload: { teams: [] },
    })

    test('returns the new state w/ an empty array for teams', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.teams).toEqual([])
      expect(newState.teams?.length).toBe(0)
    })
  })

  describe('w/ a state w/ teams and RESET_ALL_TEAMS action type', () => {
    const initialState: ITeamsState = {
      teams: null,
    }
    const teams: ITeam[] = [
      {
        id: 1,
        name: 'test_name',
        logo: 'test_logo',
      },
    ]
    const state: ITeamsState = {
      teams,
    }
    const newState: ITeamsState = reducer(state, {
      type: ActionType.RESET_ALL_TEAMS,
    })

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState)
      expect(newState.teams).toEqual(null)
    })
  })
})
