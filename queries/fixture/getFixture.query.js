const Fixture = require('../../models').fixture;

module.exports = async (id) => await Fixture.findOne({ where: { id } });
