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
  describe('with initial state and #ALL_TEAMS_FETCHED, action', () => {
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
  // describe('if given FETCH_TEACHERS action with empty array', () => {
  //   test('returns the new state with [] ', () => {
  //     const newState = reducer(initialState, {
  //       type: STORE_TEACHERS,
  //       teachers: [],
  //     });
  //     expect(newState).toEqual({ all: [] });
  //   });
  // });
});
