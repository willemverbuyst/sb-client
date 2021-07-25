const Team = require('../models').team;

const getAllTeams = async () => await Team.findAll();

module.exports = { getAllTeams };
