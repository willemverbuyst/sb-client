const express = require('express');
const authController = require('../controllers/authController');
const predictionController = require('../controllers/predictionController');

const router = express.Router();

router
  .route('/player/:id')
  .get(authController.protect, predictionController.getAllPredictions);

router
  .route('/:id')
  .post(authController.protect, predictionController.postPrediction)
  .patch(authController.protect, predictionController.updatePrediction);

module.exports = router;
