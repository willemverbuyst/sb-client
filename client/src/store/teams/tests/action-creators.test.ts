import axios from 'axios'

import { IAllTeams } from '../../../models/toto.models'
import { appDoneLoading, appLoading } from '../../appState/actions'
import fetchAllTeams from '../action-creators'
import { storeAllTeams } from '../actions'

const mockAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  jest.resetAllMocks()
})

describe('#fetchAllTeams', () => {
  it('calls axios and returns teams', async () => {
    const allTeams: IAllTeams = {
      teams: [
        {
          id: 1,
          name: 'test_name',
          logo: 'test_logo',
        },
      ],
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { data: allTeams } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchAllTeams()(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(storeAllTeams(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})
