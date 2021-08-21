import { ITeam, ITeamForSelector } from '../../models/toto.models';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

export const selectTeams = (state: StoreState): ITeamForSelector[] | null => {
  if (state.teamsState.teams) {
    const teams = state.teamsState.teams;
    const sortedTeams = UTILS.sortArrayWithObjects<keyof ITeam, ITeam>('name')(
      'ascending',
    )(teams);
    const teamsForSelector = sortedTeams.map((team) => {
      return {
        name: team.name,
        id: team.id,
      };
    });

    return teamsForSelector;
  } else {
    return null;
  }
};
