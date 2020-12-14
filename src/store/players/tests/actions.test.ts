import axios from 'axios';
import { IPlayer, IPlayerProfile } from '../../../models/player.model';
import {
  addNewPlayer,
  addPlayer,
  allPlayersFetched,
  fetchAllPlayers,
  fetchPlayerProfile,
  playerProfileFetched,
  removeAllPlayers,
} from '../actions';
import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  PLAYER_PROFILE_FETCHED,
  REMOVE_ALL_PLAYERS,
  AddNewPlayer,
  AllPlayersFetched,
  PlayerProfileFetched,
  RemoveAllPlayers,
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
