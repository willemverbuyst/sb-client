import { ITeam } from '../models/toto.models';
import { sortArrayWithObjects } from './sort.functions';

interface IOptionsForSelector {
  name: string;
  id: number;
}

export const getTeamsForSelector = (teams: ITeam[]): IOptionsForSelector[] => {
  const sortedTeams = sortArrayWithObjects<keyof ITeam, ITeam>('name')(teams);
  const teamsForSelector = sortedTeams.map((team) => {
    return {
      name: team.name,
      id: team.id,
    };
  });

  return teamsForSelector;
};
