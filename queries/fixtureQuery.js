const Fixture = require('../models').fixture;

const getFixture = async (id) => await Fixture.findOne({ where: { id } });

module.exports = { getFixture };
