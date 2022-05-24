const Axios = require('axios');
// const Team = require('../models').team;

const getTeams = async () => {
  const response = await Axios.get(
    `${process.env.API_URL}/teams/search/Netherlands`,
    // {
    //   headers: {
    //     'X-RapidAPI-Key': process.env.API_KEY,
    //   },
    // },
  );

  const allTeams = response.data.api;

  console.log('allTeams', allTeams);

  // const teams = allTeams.teams.map((team) => ({
  //   id: team.team_id,
  //   name: team.name,
  //   logo: team.logo,
  // }));

  // // console.log(teams);

  // await Team.bulkCreate(teams, {
  //   updateOnDuplicate: ['id'],
  // });
};

module.exports = getTeams;
