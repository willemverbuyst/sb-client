const express = require('express');
const authController = require('../controllers/authController');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router
  .route('/round/:id')
  .get(authController.protect, scoreController.getScoresRound);
router
  .route('/totaltoto')
  .get(authController.protect, scoreController.getScoresTotalToto);
router
  .route('/totoround/:id')
  .get(authController.protect, scoreController.getScoresTotoRound);

module.exports = router;
//
