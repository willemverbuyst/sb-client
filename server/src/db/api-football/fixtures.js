const Axios = require('axios');
const Fixture = require('../models').fixture;
const { fixtureQueries } = require('../queries');

// const { getLastUpdateQuery } = fixtureQueries;
// const firstFixture = process.env.ID_FIRST_FIXTURE;
// const updateInterval = process.env.UPDATE_INTERVAL;

const getFixtures = async () => {
  // const lastUpdate = await getLastUpdateQuery(firstFixture);
  const rightNow = new Date();

  // if (!lastUpdate || rightNow - lastUpdate > updateInterval) {
  const response = await Axios.get(
    `${process.env.API_URL}/fixtures/league/${process.env.LEAGUE_ID}`,
    {
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
      },
    },
  );

  const fixtureData = response.data.api;

  const fixtures = fixtureData.fixtures.map((fixture) => ({
    id: +fixture.fixture_id,
    homeTeamId: fixture.homeTeam.team_id,
    homeTeamName: fixture.homeTeam.team_name,
    homeTeamLogo: fixture.homeTeam.logo,
    goalsHomeTeam: fixture.goalsHomeTeam,
    awayTeamId: fixture.awayTeam.team_id,
    awayTeamName: fixture.awayTeam.team_name,
    awayTeamLogo: fixture.awayTeam.logo,
    goalsAwayTeam: fixture.goalsAwayTeam,
    eventTimeStamp: fixture.event_timestamp,
    round: fixture.round,
    status: fixture.status,
    updateAt: rightNow,
  }));

  console.log(fixtures);

  // await Fixture.bulkCreate(fixtures, {
  //   updateOnDuplicate: [
  //     'goalsHomeTeam',
  //     'goalsAwayTeam',
  //     'status',
  //     'eventTimeStamp',
  //     'updatedAt',
  //   ],
  // });
};
// };

module.exports = getFixtures;
