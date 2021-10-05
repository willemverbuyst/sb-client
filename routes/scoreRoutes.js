const express = require('express');
const authController = require('../controllers/authController');
const { scoreControllers } = require('../controllers');

const {
  getScoresPlayerController,
  getScoresRoundController,
  getScoresTotalTotoController,
  getScoresTotoRoundController,
} = scoreControllers;

const router = express.Router();

router
  .route('/players/:id')
  .get(authController.protect, getScoresPlayerController);
router
  .route('/rounds/:id')
  .get(authController.protect, getScoresRoundController);
router
  .route('/totalToto')
  .get(authController.protect, getScoresTotalTotoController);
router
  .route('/totoRounds/:id')
  .get(authController.protect, getScoresTotoRoundController);

module.exports = router;
