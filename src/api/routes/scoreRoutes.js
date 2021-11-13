const express = require('express');
const { authControllers, scoreControllers } = require('../controllers');

const { protectController } = authControllers;
const {
  getScoresPlayerController,
  getScoresRoundController,
  getScoresTotalTotoController,
  getScoresTotoRoundController,
} = scoreControllers;

const router = express.Router();

router
  .route('/players/:playerId')
  .get(protectController, getScoresPlayerController);
router.route('/rounds/:id').get(protectController, getScoresRoundController);
router.route('/totalToto').get(protectController, getScoresTotalTotoController);
router
  .route('/totoRounds/:id')
  .get(protectController, getScoresTotoRoundController);

module.exports = router;
