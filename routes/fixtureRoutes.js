const express = require('express');
const authController = require('../controllers/authController');
const fixtureController = require('../controllers/fixtureController');

const router = express.Router();

router
  .route('/:id')
  .get(authController.protect, fixtureController.getFixtureWithScores);

module.exports = router;
