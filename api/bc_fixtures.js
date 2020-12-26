const Axios = require('axios');
const Fixture = require('../models').fixture;
const apiKey = require('../config/constants').apiKey;
const apiUrl = require('../config/constants').apiUrl;
const league_id = 2673;

const getFixtures = async () => {
  const response = await Axios.get(`${apiUrl}/fixtures/league/${league_id}`, {
    headers: {
      'X-RapidAPI-Key': apiKey,
    },
  });

  const fixtureData = response.data.api;

  const fixtures = fixtureData.fixtures.map((fixture) => {
    return {
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
    };
  });

  await Fixture.bulkCreate(fixtures, {
    updateOnDuplicate: [
      'goalsHomeTeam',
      'goalsAwayTeam',
      'status',
      'eventTimeStamp',
    ],
  });

  setInterval(getFixtures, 60 * 60 * 1000);
};

exports.getFixtures = getFixtures;
