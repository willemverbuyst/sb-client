const Team = require('../../models').team;

module.exports = async (id) =>
  await Team.findOne({ where: { id } }, { attributes: ['id', 'name', 'logo'] });
