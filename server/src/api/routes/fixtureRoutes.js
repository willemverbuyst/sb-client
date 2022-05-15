const express = require('express');
const { authControllers, fixtureControllers } = require('../controllers');

const { protectController } = authControllers;
const { getFixtureWithScoresController } = fixtureControllers;

const router = express.Router();

router
  .route('/:fixtureId')
  .get(protectController, getFixtureWithScoresController);

module.exports = router;
