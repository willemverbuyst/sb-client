import { IAllPlayers, INewPlayer, IPlayer } from '../../../models/player.model'
import {
  ActionType,
  AddNewPlayer,
  DeletePlayer,
  ResetPlayers,
  StoreAllPlayers,
} from '../action-types'
import reducer, { IPlayersState } from '../reducer'

describe('#playersStateReducer', () => {
  describe('if given ADD_NEW_PLAYER action type and intialState', () => {
    const newPlayer: INewPlayer = {
      player: {
        admin: false,
        email: 'test@test.com',
        firstName: 'test_player',
        id: 'id_1',
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
    }
    const initialState: IPlayersState = {
      players: null,
    }
    const action: AddNewPlayer = {
      type: ActionType.ADD_NEW_PLAYER,
      payload: newPlayer,
    }
    const newState: IPlayersState = reducer(initialState, action)

    test('returns the initial state with players: null', () => {
      expect(newState).toEqual({
        players: null,
      })
      expect(newState.players).toEqual(null)
      expect(newState).toEqual(initialState)
    })
  })

  describe('if given ADD_NEW_PLAYER action type and a state with players', () => {
    const player: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player',
      id: 'id_1',
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
    const newPlayer = { player }
    const initialState: IPlayersState = {
      players: [player],
    }
    const action: AddNewPlayer = {
      type: ActionType.ADD_NEW_PLAYER,
      payload: newPlayer,
    }
    const newState: IPlayersState = reducer(initialState, action)

    test('returns the state with a player added to players', () => {
      expect(newState.players?.length).toBe(2)
      expect(newState.players).toEqual([player, player])
    })
  })

  describe('if given STORE_ALL_PLAYERS action type and initialState', () => {
    const allPlayers: IAllPlayers = {
      players: [
        {
          admin: false,
          email: 'test@test.com',
          firstName: 'test_player',
          id: 'id_1',
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
    const initialState: IPlayersState = {
      players: null,
    }
    const action: StoreAllPlayers = {
      type: ActionType.STORE_ALL_PLAYERS,
      payload: allPlayers,
    }
    const newState: IPlayersState = reducer(initialState, action)

    test('returns a new state with players', () => {
      expect(newState.players?.length).toBe(allPlayers.players.length)
      expect(newState.players).toEqual(allPlayers.players)
    })
  })

  describe('w/ DELETE_PLAYER action type', () => {
    const player1: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player1',
      id: 'id_1',
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
    const player2: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player2',
      id: 'id_2',
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
    const state: IPlayersState = {
      players: [player1, player2],
    }
    const action: DeletePlayer = {
      type: ActionType.DELETE_PLAYER,
      payload: player2.id,
    }
    const newState: IPlayersState = reducer(state, action)

    test('returns a state without the deleted player', () => {
      /*eslint-disable */
      expect(newState.players?.length).toBe(state.players!.length - 1)
      /* eslint-enable */
      expect(newState.players).toEqual([player1])
      expect(newState.players).not.toEqual([player1, player2])
    })
  })

  describe('if given RESET_PLAYERS action type and a state', () => {
    const players: IPlayer[] = [
      {
        admin: false,
        email: 'test@test.com',
        firstName: 'test_player',
        id: 'id_1',
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
    ]
    const state: IPlayersState = {
      players,
    }
    const initialState: IPlayersState = {
      players: null,
    }
    const action: ResetPlayers = {
      type: ActionType.RESET_PLAYERS,
    }
    const newState: IPlayersState = reducer(state, action)

    test('returns the state with no profile and no players', () => {
      expect(newState.players).toBe(null)
      expect(newState).toEqual(initialState)
    })
  })
})
