/* Call getTeams once, to get all the teams and seed the team_table */
const getTeams = require('./teams');

const importTeams = async () => {
  if (process.argv[2] === '--importTeams') {
    await getTeams();
    process.exit();
  }
};

importTeams();
