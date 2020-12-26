import axios from 'axios';
import { IPlayer, IPlayerProfile } from '../../../models/player.model';
import {
  addNewPlayer,
  addPlayer,
  allPlayersFetched,
  deletePlayer,
  fetchAllPlayers,
  fetchPlayerProfile,
  fetchPlayerScores,
  playerDelete,
  playerProfileFetched,
  playerScoresFetched,
  removeAllPlayers,
  updateAdminStatus,
  updatePlayerAdminStatus,
} from '../actions';
import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  DELETE_PLAYER,
  PLAYER_PROFILE_FETCHED,
  REMOVE_ALL_PLAYERS,
  AddNewPlayer,
  AllPlayersFetched,
  DeletePlayer,
  PlayerProfileFetched,
  RemoveAllPlayers,
  ScoresPlayer,
  PlayerScoresFetched,
  PLAYER_SCORES_FETCHED,
  UPDATE_ADMIN_STATUS,
  UpdateAdminStatus,
} from '../types';
import { appLoading, appDoneLoading, setMessage } from '../../appState/actions';
import { ISignUpCredentials } from '../../../models/credentials.model';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#playersState', () => {
  describe('#addNewPlayer w/ player', () => {
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
    const expected: AddNewPlayer = {
      type: ADD_NEW_PLAYER,
      player,
    };

    test('returns an action w/ type ADD_NEW_PLAYER and player as payload', () => {
      expect(addNewPlayer(player)).toEqual(expected);
      expect(addNewPlayer(player).player).not.toBe(undefined);
    });
  });

  describe('#allPlayersFetched w/ players', () => {
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
    const expected: AllPlayersFetched = {
      type: ALL_PLAYERS_FETCHED,
      players,
    };

    test('returns an action w/ type ALL_PLAYERS_FETCHED and players as payload', () => {
      expect(allPlayersFetched(players)).toEqual(expected);
      expect(allPlayersFetched(players).players.length).toBe(1);
      expect(allPlayersFetched(players).players).not.toBe(undefined);
    });
  });

  describe('#deletePlayer w/ players', () => {
    const playerId = 1;
    const expected: DeletePlayer = {
      type: DELETE_PLAYER,
      playerId,
    };

    test('returns an action w/ type DELETE_PLAYER and a playerId as payload', () => {
      expect(deletePlayer(playerId)).toEqual(expected);
      expect(deletePlayer(playerId).playerId).toBe(1);
      expect(deletePlayer(playerId).playerId).not.toBe(undefined);
    });
  });

  describe('#playerProfileFetched w/ profile', () => {
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
    const expected: PlayerProfileFetched = {
      type: PLAYER_PROFILE_FETCHED,
      playerProfile,
    };

    test('returns an action w/ type PLAYER_PROFILE_FETCHED and a profile as payload', () => {
      expect(playerProfileFetched(playerProfile)).toEqual(expected);
      expect(playerProfileFetched(playerProfile)?.playerProfile.firstName).toBe(
        'test_player'
      );
    });
  });

  describe('#playerScoresFetched w/ scores', () => {
    const scoresPlayer: ScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      id: 1,
    };
    const expected: PlayerScoresFetched = {
      type: PLAYER_SCORES_FETCHED,
      scoresPlayer,
    };

    test('returns an action w/ type PLAYER_SCORES_FETCHED and scores as payload', () => {
      expect(playerScoresFetched(scoresPlayer)).toEqual(expected);
      expect(
        playerScoresFetched(scoresPlayer)?.scoresPlayer.scores.length
      ).toBe(2);
    });
  });

  describe('#removeAllPlayers', () => {
    const expected: RemoveAllPlayers = {
      type: REMOVE_ALL_PLAYERS,
    };

    test('returns an action w/ type REMOVE_ALL_PLAYERS and no payload', () => {
      expect(removeAllPlayers()).toEqual(expected);
      expect(removeAllPlayers()).not.toHaveProperty('payload');
      expect(removeAllPlayers()).toHaveProperty('type');
    });
  });

  describe('#updateAdminStatus w/ player', () => {
    const player: IPlayer = {
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
    const expected: UpdateAdminStatus = {
      type: UPDATE_ADMIN_STATUS,
      player,
    };

    test('returns an action w/ type UPDATE_ADMIN_STATUS and a player as payload', () => {
      expect(updateAdminStatus(player)).toEqual(expected);
      expect(updateAdminStatus(player)).toHaveProperty('player');
    });
  });
});

describe('#addPlayer', () => {
  it('calls axios and returns a player', async () => {
    const signUpCredentials: ISignUpCredentials = {
      userName: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'test',
      phoneNumber: '123',
      admin: false,
      totaalToto: true,
      teamId: 1,
    };
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

    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: { userData: player, message: 'test_message' } };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await addPlayer(signUpCredentials)(dispatch, getState);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(addNewPlayer(response.data.userData));
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#fetchAllPlayers', () => {
  it('calls axios and returns all players', async () => {
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

    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: players };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchAllPlayers()(dispatch, getState);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(allPlayersFetched(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchPlayerProfile', () => {
  it('calls axios and returns a player profile', async () => {
    const id = 1;
    const player: IPlayerProfile = {
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

    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: player };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchPlayerProfile(id)(dispatch, getState);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(playerProfileFetched(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchPlayerScores', () => {
  it('calls axios and returns scores for a player', async () => {
    const id = 1;
    const scoresPlayer: ScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      id: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: scoresPlayer };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchPlayerScores(id)(dispatch, getState);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(playerScoresFetched(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fplayerDelete', () => {
  it('calls axios and returns a succes message', async () => {
    const id = 1;

    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: { message: 'ok' } };

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve(response));

    await playerDelete(id)(dispatch, getState);

    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(deletePlayer(id));
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#updatePlayerAdminStatus', () => {
  it('calls axios and returns an updated player', async () => {
    const id = 1;
    const status = true;
    const player: IPlayerProfile = {
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

    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: { updatedUser: player, message: 'ok' } };

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response));

    await updatePlayerAdminStatus(id, status)(dispatch, getState);

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(
      updateAdminStatus(response.data.updatedUser)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
