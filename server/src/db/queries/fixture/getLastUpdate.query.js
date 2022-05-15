const Fixture = require('../../models').fixture;

module.exports = async (id) => {
  const fixture = await Fixture.findOne({
    where: { id },
    attributes: ['updatedAt'],
  });

  const lastUpdate = fixture ? new Date(fixture.dataValues.updatedAt) : null;

  return lastUpdate;
};
