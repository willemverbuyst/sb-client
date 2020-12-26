import reducer from '../reducer';
import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  DELETE_PLAYER,
  PLAYER_PROFILE_FETCHED,
  PLAYER_SCORES_FETCHED,
  REMOVE_ALL_PLAYERS,
  UPDATE_ADMIN_STATUS,
  PlayersState,
  AddNewPlayer,
  AllPlayersFetched,
  DeletePlayer,
  PlayerProfileFetched,
  PlayerScoresFetched,
  RemoveAllPlayers,
  ScoresPlayer,
  UpdateAdminStatus,
} from '../types';
import { IPlayer, IPlayerProfile } from '../../../models/player.model';

describe('#playersStateReducer', () => {
  describe('if given ADD_NEW_PLAYER action type and intialState', () => {
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
    };
    const initialState: PlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: AddNewPlayer = {
      type: ADD_NEW_PLAYER,
      player,
    };
    const newState: PlayersState = reducer(initialState, action);

    test('returns the initial state with players: null', () => {
      expect(newState).toEqual({
        players: null,
        playerProfile: null,
        scoresPlayer: null,
      });
      expect(newState.playerProfile).toBeNull;
      expect(newState.players).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState).toEqual(initialState);
    });
  });

  describe('if given ADD_NEW_PLAYER action type and a state with players', () => {
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
    };
    const initialState: PlayersState = {
      players: [player],
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: AddNewPlayer = {
      type: ADD_NEW_PLAYER,
      player,
    };
    const newState: PlayersState = reducer(initialState, action);

    test('returns the state with a player added to players', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players?.length).toBe(2);
      expect(newState.players).toEqual([player, player]);
    });
  });

  describe('if given ALL_PLAYERS_FETCHED action type and initialState', () => {
    const players: IPlayer[] = [
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
      scoresPlayer: null,
    };
    const action: AllPlayersFetched = {
      type: ALL_PLAYERS_FETCHED,
      players,
    };
    const newState: PlayersState = reducer(initialState, action);

    test('returns a new state with players', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players?.length).toBe(players.length);
      expect(newState.players).toEqual(players);
    });
  });

  describe('if given ALL_PLAYERS_FETCHED action type and a state with players', () => {
    const players1: IPlayer[] = [
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
    const players2: IPlayer[] = [
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
      scoresPlayer: null,
    };
    const action: AllPlayersFetched = {
      type: ALL_PLAYERS_FETCHED,
      players: players2,
    };
    const newState: PlayersState = reducer(state, action);

    test('returns a state with the new fetched players', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players?.length).toBe(players2.length);
      expect(newState.players).toEqual(players2);
      expect(newState.players).not.toEqual(players1);
    });
  });

  describe('w/ DELETE_PLAYER action type', () => {
    const player1: IPlayer = {
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
    };
    const player2: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player2',
      id: 2,
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
    const state: PlayersState = {
      players: [player1, player2],
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: DeletePlayer = {
      type: DELETE_PLAYER,
      playerId: player2.id,
    };
    const newState: PlayersState = reducer(state, action);

    test('returns a state without the deleted player', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState.players?.length).toBe(state.players!.length - 1);
      expect(newState.players).toEqual([player1]);
      expect(newState.players).not.toEqual([player1, player2]);
    });
  });

  describe('if given PLAYER_PROFILE_FETCHED action type and initialState', () => {
    const playerProfile: IPlayerProfile = {
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
      pastFixturesWithScores: null,
    };
    const initialState: PlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: PlayerProfileFetched = {
      type: PLAYER_PROFILE_FETCHED,
      playerProfile,
    };
    const newState: PlayersState = reducer(initialState, action);

    test('returns a new state with a player profile', () => {
      expect(newState.players).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState.playerProfile).toEqual(playerProfile);
    });
  });

  describe('if given PLAYER_PROFILE_FETCHED action type and a state with a profile', () => {
    const players: IPlayer[] = [
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
    const playerProfile1: IPlayerProfile = {
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
      pastFixturesWithScores: null,
    };
    const playerProfile2: IPlayerProfile = {
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
      pastFixturesWithScores: null,
    };
    const state: PlayersState = {
      players,
      playerProfile: playerProfile1,
      scoresPlayer: null,
    };
    const action: PlayerProfileFetched = {
      type: PLAYER_PROFILE_FETCHED,
      playerProfile: playerProfile2,
    };
    const newState: PlayersState = reducer(state, action);

    test('returns the state with the new profile', () => {
      expect(newState.playerProfile).toEqual(playerProfile2);
      expect(newState.playerProfile).not.toEqual(playerProfile1);
      expect(newState.playerProfile?.firstName).toBe('test_player2');
      expect(newState.playerProfile?.firstName).not.toBe('test_player1');
      expect(newState.players).toEqual(players);
    });
  });

  describe('if given PLAYER_SCORES_FETCHED action type and initialState', () => {
    const scoresPlayer: ScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      id: 1,
    };
    const initialState: PlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: PlayerScoresFetched = {
      type: PLAYER_SCORES_FETCHED,
      scoresPlayer,
    };
    const newState: PlayersState = reducer(initialState, action);

    test('returns a new state with a player scores', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players).toBeNull;
      expect(newState.scoresPlayer).not.toBeNull;
      expect(newState.scoresPlayer).toEqual(scoresPlayer);
    });
  });

  describe('if given REMOVE_ALL_PLAYERS action type and a state', () => {
    const players: IPlayer[] = [
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
    const playerProfile: IPlayerProfile = {
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
      pastFixturesWithScores: null,
    };
    const scoresPlayer: ScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      id: 1,
    };
    const state: PlayersState = {
      players,
      playerProfile,
      scoresPlayer,
    };
    const initialState: PlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: RemoveAllPlayers = {
      type: REMOVE_ALL_PLAYERS,
    };
    const newState: PlayersState = reducer(state, action);

    test('returns the state with no profile and no players', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState).toEqual(initialState);
    });
  });

  describe('w/ UPDATE_ADMIN_STATUS action type', () => {
    const player1: IPlayer = {
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
    };
    const player2: IPlayer = {
      admin: false,
      email: 'test@test.com',
      firstName: 'test_player1',
      id: 2,
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
    const updatedAdminPlayer: IPlayer = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test_player1',
      id: 2,
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
    const state: PlayersState = {
      players: [player1, player2],
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: UpdateAdminStatus = {
      type: UPDATE_ADMIN_STATUS,
      player: updatedAdminPlayer,
    };
    const newState: PlayersState = reducer(state, action);

    test('returns a state w/ one player updated', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState.players).not.toEqual([player1, player2]);
      expect(newState.players).toEqual([player1, updatedAdminPlayer]);
    });
  });
});
