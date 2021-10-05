const express = require('express');
const authController = require('../controllers/authController');
const { fixtureControllers } = require('../controllers');

const { getFixtureWithScoresController } = fixtureControllers;

const router = express.Router();

router
  .route('/:id')
  .get(authController.protect, getFixtureWithScoresController);

module.exports = router;
