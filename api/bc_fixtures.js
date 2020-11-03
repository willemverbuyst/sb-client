const Axios = require('axios');
/* Fixture model to be created */
const Fixture = require('../models').fixture;
const apiKey = require('../config/constants').apiKey;
const apiUrl = require('../config/constants').apiUrl;
const league_id = 2673;

const getMatches = async () => {
  const response = await Axios.get(`${apiUrl}/fixtures/league/${league_id}`, {
    headers: {
      'X-RapidAPI-Key': apiKey,
    },
  });

  const allFixtures = response.data.api;

  const fixtures = allFixtures.fixtures.map((fixture) => {
    return {
      id: fixture.fixture_id,
      homeTeamId: fixture.homeTeam.team_id,
      goalsHomeTeam: fixture.goalsHomeTeam,
      awayTeamId: fixture.awayTeam.team_id,
      goalsAwayTeam: fixture.goalsAwayTeam,
      eventTimeStamp: fixture.event_timestamp,
      round: fixture.round,
      status: fixture.status,
    };
  });

  /* Fixture model to be created */
  Fixture.bulkCreate(fixtures, {
    updateOnDuplicate: ['id'],
  });
};

exports.getFixtures = getFixtures;
