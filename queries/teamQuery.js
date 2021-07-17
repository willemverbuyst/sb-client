const Team = require('../models').team;

const getTeams = async () => await Team.findAll();

module.exports = { getTeams };
