import { IAllPlayers, INewPlayer } from '../../../models/player.model'
import {
  ActionType,
  AddNewPlayer,
  DeletePlayer,
  ResetPlayers,
  StoreAllPlayers,
} from '../action-types'
import {
  addNewPlayer,
  deletePlayer,
  resetPlayers,
  storeAllPlayers,
} from '../actions'

describe('#playersState', () => {
  describe('#addNewPlayer w/ player', () => {
    const newPlayer: INewPlayer = {
      player: {
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
    }
    const expected: AddNewPlayer = {
      type: ActionType.ADD_NEW_PLAYER,
      payload: newPlayer,
    }

    test('returns an action w/ type ADD_NEW_PLAYER and player as payload', () => {
      expect(addNewPlayer(newPlayer)).toEqual(expected)
      expect(addNewPlayer(newPlayer).type).toEqual(ActionType.ADD_NEW_PLAYER)
      expect(addNewPlayer(newPlayer).payload).toEqual(newPlayer)
    })
  })

  describe('#storeAllPlayers w/ players', () => {
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
    const expected: StoreAllPlayers = {
      type: ActionType.STORE_ALL_PLAYERS,
      payload: allPlayers,
    }

    test('returns an action w/ type STORE_ALL_PLAYERS and players as payload', () => {
      expect(storeAllPlayers(allPlayers)).toEqual(expected)
      expect(storeAllPlayers(allPlayers).type).toEqual(
        ActionType.STORE_ALL_PLAYERS
      )
      expect(storeAllPlayers(allPlayers).payload).toEqual(allPlayers)
    })
  })

  describe('#deletePlayer w/ players', () => {
    const playerId = 1
    const expected: DeletePlayer = {
      type: ActionType.DELETE_PLAYER,
      payload: playerId,
    }

    test('returns an action w/ type DELETE_PLAYER and a playerId as payload', () => {
      expect(deletePlayer(playerId)).toEqual(expected)
      expect(deletePlayer(playerId).type).toEqual(ActionType.DELETE_PLAYER)
      expect(deletePlayer(playerId).payload).toEqual(playerId)
    })
  })

  describe('#resetPlayers', () => {
    const expected: ResetPlayers = {
      type: ActionType.RESET_PLAYERS,
    }

    test('returns an action w/ type RESET_PLAYERS and no payload', () => {
      expect(resetPlayers()).toEqual(expected)
      expect(resetPlayers()).not.toHaveProperty('payload')
      expect(resetPlayers().type).toEqual(ActionType.RESET_PLAYERS)
    })
  })
})
