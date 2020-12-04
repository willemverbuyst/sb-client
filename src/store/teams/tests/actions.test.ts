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
  describe('#allTeamsFetched  w/', () => {
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
    test('returns an action w/ type #ALL_TEAMS_FETCHED and payload w/ teams', () => {
      expect(allTeamsFetched(teams)).toEqual(expected);
    });
  });
});
