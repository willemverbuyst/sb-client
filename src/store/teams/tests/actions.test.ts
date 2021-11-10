import { IAllTeams } from '../../../models/toto.models'
import { ActionType, ResetAllTeams, StoreAllTeams } from '../action-types'
import { resetAllTeams, storeAllTeams } from '../actions'

describe('#teamsState', () => {
  describe('#storeAllTeams w/ teams', () => {
    const allTeams: IAllTeams = {
      teams: [
        {
          id: 1,
          name: 'test_name',
          logo: 'test_logo',
        },
      ],
    }
    const expected: StoreAllTeams = {
      type: ActionType.STORE_ALL_TEAMS,
      payload: allTeams,
    }

    test('returns an action w/ type STORE_ALL_TEAMS and teams as payload', () => {
      expect(storeAllTeams(allTeams)).toEqual(expected)
      expect(storeAllTeams(allTeams).type).toBe(ActionType.STORE_ALL_TEAMS)
      expect(storeAllTeams(allTeams).payload).toBe(allTeams)
    })
  })
  describe('#resetAllTeams', () => {
    const expected: ResetAllTeams = {
      type: ActionType.RESET_ALL_TEAMS,
    }

    test('returns an action w/ type RESET_ALL_TEAMS and no payload', () => {
      expect(resetAllTeams()).toEqual(expected)
      expect(resetAllTeams().type).toBe(ActionType.RESET_ALL_TEAMS)
      expect(resetAllTeams()).not.toHaveProperty('payload')
    })
  })
})
