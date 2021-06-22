import { ITeam } from '../../../../models/toto.models';
import * as UTILS from '../../../../utils';

interface IOptionsForSelector {
  name: string;
  id: number;
}

const getTeamsForSelector = (teams: ITeam[]): IOptionsForSelector[] => {
  const sortedTeams = UTILS.sortArrayWithObjects<keyof ITeam, ITeam>('name')(teams);
  const teamsForSelector = sortedTeams.map((team) => {
    return {
      name: team.name,
      id: team.id,
    };
  });

  return teamsForSelector;
};

export { getTeamsForSelector };
