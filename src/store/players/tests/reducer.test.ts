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
  describe('if given ALL_PLAYERS_FETCHED action type and initialState', () => {
    test('returns a new state with a players', () => {
      const players = [
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
      ];
      const initialState: PlayersState = {
        players: null,
        playerProfile: null,
      };
      const action: AllPlayersFetched = {
        type: ALL_PLAYERS_FETCHED,
        players,
      };
      const newState: PlayersState = reducer(initialState, action);
      expect(newState.playerProfile).toBeNull;
      expect(newState.players!.length).toBe(players.length);
      expect(newState.players).toEqual(players);
    });
  });
  describe('if given ALL_PLAYERS_FETCHED action type and a state with players', () => {
    test('returns a state with the new fetched players', () => {
      const players1 = [
        {
          admin: false,
          email: 'test@test.com',
          firstName: 'test_player1',
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
      ];
      const players2 = [
        {
          admin: false,
          email: 'test@test.com',
          firstName: 'test_player2',
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
      ];
      const state: PlayersState = {
        players: players1,
        playerProfile: null,
      };
      const action: AllPlayersFetched = {
        type: ALL_PLAYERS_FETCHED,
        players: players2,
      };
      const newState: PlayersState = reducer(state, action);
      expect(newState.playerProfile).toBeNull;
      expect(newState.players!.length).toBe(players2.length);
      expect(newState.players).toEqual(players2);
      expect(newState.players).not.toEqual(players1);
    });
  });
});
