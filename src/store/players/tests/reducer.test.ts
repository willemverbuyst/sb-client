import reducer from '../reducer';
import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  PLAYER_PROFILE_FETCHED,
  REMOVE_ALL_PLAYERS,
  PlayersState,
  AddNewPlayer,
  AllPlayersFetched,
  PlayerProfileFetched,
  RemoveAllPlayers,
} from '../types';

describe('#playersStateReducer', () => {
  describe('if given ADD_NEW_PLAYER action type and intialState', () => {
    test('returns the initial state with players: null', () => {
      const player = {
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
      };
      const initialState: PlayersState = {
        players: null,
        playerProfile: null,
      };
      const action: AddNewPlayer = {
        type: ADD_NEW_PLAYER,
        player,
      };
      const newState: PlayersState = reducer(initialState, action);
      expect(newState).toEqual({
        players: null,
        playerProfile: null,
      });
      expect(newState.playerProfile).toBeNull;
      expect(newState.players).toBeNull;
      expect(newState).toEqual(initialState);
    });
  });
  describe('if given ADD_NEW_PLAYER action type and a state with players', () => {
    test('returns the state with a player added to players', () => {
      const player = {
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
      };
      const initialState: PlayersState = {
        players: [player],
        playerProfile: null,
      };
      const action: AddNewPlayer = {
        type: ADD_NEW_PLAYER,
        player,
      };
      const newState: PlayersState = reducer(initialState, action);
      expect(newState.playerProfile).toBeNull;
      expect(newState.players!.length).toBe(2);
      expect(newState.players).toEqual([player, player]);
    });
  });
});
