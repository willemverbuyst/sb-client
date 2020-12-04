import { ITeam } from '../../../models/toto.models';
import {
  allTeamsFetched,
  removeTeams,
  removeAllTeams,
  fetchAllTeams,
} from '../actions';
import {
  ALL_TEAMS_FETCHED,
  REMOVE_ALL_TEAMS,
  AllTeamsFetched,
  RemoveAllTeams,
} from '../types';

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
