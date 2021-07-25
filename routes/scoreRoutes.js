const express = require('express');
const authController = require('../controllers/authController');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router
  .route('/players/:id')
  .get(authController.protect, scoreController.getScoresPlayer);
router
  .route('/rounds/:id')
  .get(authController.protect, scoreController.getScoresRound);
router
  .route('/totalToto')
  .get(authController.protect, scoreController.getScoresTotalToto);
router
  .route('/totoRounds/:id')
  .get(authController.protect, scoreController.getScoresTotoRound);

module.exports = router;
