const Fixture = require('../../models').fixture;

module.exports = async (id) =>
  await Fixture.findOne({
    where: { id },
    attributes: [
      'id',
      'homeTeamId',
      'homeTeamName',
      'homeTeamLogo',
      'goalsHomeTeam',
      'awayTeamId',
      'awayTeamName',
      'awayTeamLogo',
      'goalsAwayTeam',
      'eventTimeStamp',
      'round',
      'status',
    ],
  });
