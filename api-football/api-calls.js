/* Call getTeams once, to get all the teams and seed the team_table */
const getTeams = require('./teams');

if (process.argv[2] === '--importTeams') {
  getTeams();
}
