/* Call getTeams once, to get all the teams and seed the team_table */
const getTeams = require('./teams');
const getFixtures = require('./fixtures');

const importDataFromApi = async () => {
  if (process.argv[2] === '--importTeams') {
    await getTeams();
    process.exit();
  }
  if (process.argv[2] === '--importFixtures') {
    await getFixtures();
    process.exit();
  }
};

importDataFromApi();
