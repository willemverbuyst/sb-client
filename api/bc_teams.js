const Axios = require('axios');
const Team = require('../models').team;

const getTeams = async () => {
  const response = await Axios.get(
    `${process.env.API_URL}/teams/search/Netherlands`,
    {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
      },
    },
  );

  const allTeams = response.data.api;

  const fixtures = allTeams.teams.map((team) => {
    return {
      id: team.team_id,
      name: team.name,
      logo: team.logo,
    };
  });

  Team.bulkCreate(fixtures, {
    updateOnDuplicate: ['id'],
  });
};

exports.getTeams = getTeams;
