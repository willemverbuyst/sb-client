import reducer from '../reducer';
import { ALL_TEAMS_FETCHED, REMOVE_ALL_TEAMS, TeamsState } from '../types';
import { ITeam } from '../../../models/toto.models';

describe('#allTeamsFetched', () => {
  const initialState: TeamsState = {
    teams: null,
  };
  const teams: ITeam[] = [
    {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    },
  ];
  describe('w/ initial state and ALL_TEAMS_FETCHED action type', () => {
    test('returns the new state with teams', () => {
      const newState: TeamsState = reducer(initialState, {
        type: ALL_TEAMS_FETCHED,
        teams,
      });
      expect(newState).not.toEqual(initialState);
      expect(newState.teams).toEqual(teams);
      expect(newState.teams?.length).toBe(1);
    });
  });
  describe('w/ initial state and ALL_TEAMS_FETCHED action type and no teams', () => {
    test('returns the new state w/ an empty array for teams', () => {
      const newState: TeamsState = reducer(initialState, {
        type: ALL_TEAMS_FETCHED,
        teams: [],
      });
      expect(newState).not.toEqual(initialState);
      expect(newState.teams).toEqual([]);
      expect(newState.teams?.length).toBe(0);
    });
  });
});

describe('#removeAllTeams', () => {
  const initialState: TeamsState = {
    teams: null,
  };
  const teams: ITeam[] = [
    {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    },
  ];
  const state: TeamsState = {
    teams,
  };
  describe('w/ a state w/ teams and REMOVE_ALL_TEAMS action type', () => {
    test('returns the initial state', () => {
      const newState: TeamsState = reducer(state, {
        type: REMOVE_ALL_TEAMS,
      });
      expect(newState).toEqual(initialState);
      expect(newState.teams).toEqual(null);
    });
  });
});
