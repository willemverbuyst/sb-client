import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../../models/player.model';
import {
  ActionType,
  AddNewPlayer,
  DeletePlayer,
  ResetPlayers,
  StoreAllPlayers,
  StorePlayerProfile,
  StorePlayerScores,
  UpdateAdminStatus,
} from '../action-types';
import reducer, { IPlayersState } from '../reducer';

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
    const initialState: IPlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: AddNewPlayer = {
      type: ActionType.ADD_NEW_PLAYER,
      payload: player,
    };
    const newState: IPlayersState = reducer(initialState, action);

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
    const initialState: IPlayersState = {
      players: [player],
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: AddNewPlayer = {
      type: ActionType.ADD_NEW_PLAYER,
      payload: player,
    };
    const newState: IPlayersState = reducer(initialState, action);

    test('returns the state with a player added to players', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players?.length).toBe(2);
      expect(newState.players).toEqual([player, player]);
    });
  });

  describe('if given STORE_ALL_PLAYERS action type and initialState', () => {
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
    const initialState: IPlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: StoreAllPlayers = {
      type: ActionType.STORE_ALL_PLAYERS,
      payload: players,
    };
    const newState: IPlayersState = reducer(initialState, action);

    test('returns a new state with players', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players?.length).toBe(players.length);
      expect(newState.players).toEqual(players);
    });
  });

  describe('if given STORE_ALL_PLAYERS action type and a state with players', () => {
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
    const state: IPlayersState = {
      players: players1,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: StoreAllPlayers = {
      type: ActionType.STORE_ALL_PLAYERS,
      payload: players2,
    };
    const newState: IPlayersState = reducer(state, action);

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
    const state: IPlayersState = {
      players: [player1, player2],
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: DeletePlayer = {
      type: ActionType.DELETE_PLAYER,
      payload: player2.id,
    };
    const newState: IPlayersState = reducer(state, action);

    test('returns a state without the deleted player', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      /*eslint-disable */
      expect(newState.players?.length).toBe(state.players!.length - 1);
      /*eslint-enable */
      expect(newState.players).toEqual([player1]);
      expect(newState.players).not.toEqual([player1, player2]);
    });
  });

  describe('if given STORE_PLAYER_PROFILE action type and initialState', () => {
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
    const initialState: IPlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: StorePlayerProfile = {
      type: ActionType.STORE_PLAYER_PROFILE,
      payload: playerProfile,
    };
    const newState: IPlayersState = reducer(initialState, action);

    test('returns a new state with a player profile', () => {
      expect(newState.players).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState.playerProfile).toEqual(playerProfile);
    });
  });

  describe('if given STORE_PLAYER_PROFILE action type and a state with a profile', () => {
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
    const state: IPlayersState = {
      players,
      playerProfile: playerProfile1,
      scoresPlayer: null,
    };
    const action: StorePlayerProfile = {
      type: ActionType.STORE_PLAYER_PROFILE,
      payload: playerProfile2,
    };
    const newState: IPlayersState = reducer(state, action);

    test('returns the state with the new profile', () => {
      expect(newState.playerProfile).toEqual(playerProfile2);
      expect(newState.playerProfile).not.toEqual(playerProfile1);
      expect(newState.playerProfile?.firstName).toBe('test_player2');
      expect(newState.playerProfile?.firstName).not.toBe('test_player1');
      expect(newState.players).toEqual(players);
    });
  });

  describe('if given STORE_PLAYER_SCORES action type and initialState', () => {
    const scoresPlayer: IScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      userId: 1,
    };
    const initialState: IPlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: StorePlayerScores = {
      type: ActionType.STORE_PLAYER_SCORES,
      payload: scoresPlayer,
    };
    const newState: IPlayersState = reducer(initialState, action);

    test('returns a new state with a player scores', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.players).toBeNull;
      expect(newState.scoresPlayer).not.toBeNull;
      expect(newState.scoresPlayer).toEqual(scoresPlayer);
    });
  });

  describe('if given RESET_PLAYERS action type and a state', () => {
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
    const scoresPlayer: IScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      userId: 1,
    };
    const state: IPlayersState = {
      players,
      playerProfile,
      scoresPlayer,
    };
    const initialState: IPlayersState = {
      players: null,
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: ResetPlayers = {
      type: ActionType.RESET_PLAYERS,
    };
    const newState: IPlayersState = reducer(state, action);

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
    const state: IPlayersState = {
      players: [player1, player2],
      playerProfile: null,
      scoresPlayer: null,
    };
    const action: UpdateAdminStatus = {
      type: ActionType.UPDATE_ADMIN_STATUS,
      payload: updatedAdminPlayer,
    };
    const newState: IPlayersState = reducer(state, action);

    test('returns a state w/ one player updated', () => {
      expect(newState.playerProfile).toBeNull;
      expect(newState.scoresPlayer).toBeNull;
      expect(newState.players).not.toEqual([player1, player2]);
      expect(newState.players).toEqual([player1, updatedAdminPlayer]);
    });
  });
});
