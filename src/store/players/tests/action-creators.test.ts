import axios from 'axios';

import { ISignUpCredentials } from '../../../models/credentials.model';
import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../../models/player.model';
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions';
import {
  addPlayer,
  fetchAllPlayers,
  fetchPlayerProfile,
  fetchPlayerScores,
  playerDelete,
  updatePlayerAdminStatus,
} from '../action-creators';
import {
  addNewPlayer,
  deletePlayer,
  storeAllPlayers,
  storePlayerProfile,
  storePlayerScores,
  updateAdminStatus,
} from '../actions';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
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
    const extraArg = 'extra';
    const response = { data: { userData: player, message: 'test_message' } };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await addPlayer(signUpCredentials)(dispatch, getState, extraArg);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(addNewPlayer(response.data.userData));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
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
    const extraArg = 'extra';
    const response = { data: players };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchAllPlayers()(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storeAllPlayers(response.data));
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
    const extraArg = 'extra';
    const response = { data: player };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchPlayerProfile(id)(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storePlayerProfile(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fetchPlayerScores', () => {
  it('calls axios and returns scores for a player', async () => {
    const id = 1;
    const scoresPlayer: IScoresPlayer = {
      scores: [
        [1, 2],
        [3, 4],
      ],
      userName: 'string',
      userId: 1,
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: scoresPlayer };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchPlayerScores(id)(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(storePlayerScores(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#fplayerDelete', () => {
  it('calls axios and returns a succes message', async () => {
    const id = 1;

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: { message: 'ok' } };

    mockAxios.delete.mockImplementationOnce(() => Promise.resolve(response));

    await playerDelete(id)(dispatch, getState, extraArg);

    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(deletePlayer(id));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
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
    const extraArg = 'extra';
    const response = { data: { updatedUser: player, message: 'ok' } };

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response));

    await updatePlayerAdminStatus(id, status)(dispatch, getState, extraArg);

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(updateAdminStatus(response.data.updatedUser));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});
