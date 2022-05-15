import axios from 'axios'

import { Severity } from '../../../models/app.models'
import { IProfileDetails } from '../../../models/credentials.model'
import { IAllPlayers, INewPlayer, IPlayer } from '../../../models/player.model'
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions'
import { addPlayer, fetchAllPlayers, playerDelete } from '../action-creators'
import { addNewPlayer, deletePlayer, storeAllPlayers } from '../actions'

const mockAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  jest.resetAllMocks()
})

describe('#addPlayer', () => {
  it('calls axios and returns a player', async () => {
    const signUpCredentials: IProfileDetails = {
      userName: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      phoneNumber: '123',
      totaalToto: true,
      teamId: 1,
    }
    const player: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player',
      id: 1,
      lastName: 'tst_player',
      phoneNumber: '123',
      team: {
        id: 1,
        logo: 'test_logo',
        name: 'test_name',
      },
      totaalToto: true,
      userName: 'TEST',
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response: {
      data: {
        status: Severity
        data: INewPlayer
        message: string
      }
    } = {
      data: {
        status: 'success',
        data: { player },
        message: 'test_message',
      },
    }

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response))

    await addPlayer(signUpCredentials)(dispatch, getState, extraArg)

    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(addNewPlayer(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})

describe('#fetchAllPlayers', () => {
  it('calls axios and returns all players', async () => {
    const allPlayers: IAllPlayers = {
      players: [
        {
          admin: false,
          email: 'test@test.com',
          firstName: 'test_player',
          id: 1,
          lastName: 'tst_player',
          phoneNumber: '123',
          team: {
            id: 1,
            logo: 'test_logo',
            name: 'test_name',
          },
          totaalToto: true,
          userName: 'TEST',
        },
      ],
    }

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = { data: { status: 'success', data: allPlayers } }

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response))

    await fetchAllPlayers()(dispatch, getState, extraArg)

    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(storeAllPlayers(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})

describe('#playerDelete', () => {
  it('calls axios and returns a succes message', async () => {
    const id = 1

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response: {
      data: {
        status: Severity
        data: null
        message: string
      }
    } = { data: { status: 'success', data: null, message: 'ok' } }

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve(response))

    await playerDelete(id)(dispatch, getState, extraArg)

    expect(mockAxios.delete).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(deletePlayer(id))
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})
