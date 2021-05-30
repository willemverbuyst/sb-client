import axios from 'axios';

import { ITeam } from '../../../models/toto.models';
import { appDoneLoading, appLoading } from '../../appState/actions-creators';
import { allTeamsFetched, fetchAllTeams, removeAllTeams } from '../action-creators';
import { ALL_TEAMS_FETCHED, AllTeamsFetched, REMOVE_ALL_TEAMS, RemoveAllTeams } from '../types';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#teamsState', () => {
  describe('#allTeamsFetched w/ teams', () => {
    const teams: ITeam[] = [
      {
        id: 1,
        name: 'test_name',
        logo: 'test_logo',
      },
    ];
    const expected: AllTeamsFetched = {
      type: ALL_TEAMS_FETCHED,
      teams,
    };

    test('returns an action w/ type ALL_TEAMS_FETCHED and teams as payload', () => {
      expect(allTeamsFetched(teams)).toEqual(expected);
      expect(allTeamsFetched(teams).teams.length).toBe(1);
    });
  });
  describe('#removeAllTeams', () => {
    const expected: RemoveAllTeams = {
      type: REMOVE_ALL_TEAMS,
    };

    test('returns an action w/ type REMOVE_ALL_TEAMS and no payload', () => {
      expect(removeAllTeams()).toEqual(expected);
      expect(removeAllTeams().type).toBe(expected.type);
    });
  });
});

describe('#fetchAllTeams', () => {
  it('calls axios and returns teams', async () => {
    const teams: ITeam[] = [
      {
        id: 1,
        name: 'test_name',
        logo: 'test_logo',
      },
    ];

    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: teams };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await fetchAllTeams()(dispatch, getState, extraArg);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(allTeamsFetched(teams));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
