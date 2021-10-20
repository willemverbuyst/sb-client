const Team = require('../../models').team;

module.exports = async () => await Team.findAll();
