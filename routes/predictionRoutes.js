const express = require('express');
const authController = require('../controllers/authController');
const predictionController = require('../controllers/predictionController');

const router = express.Router();

router
  .route('/')
  .post(authController.protect, predictionController.postPrediction)
  .patch(authController.protect, predictionController.updatePrediction);

module.exports = router;
