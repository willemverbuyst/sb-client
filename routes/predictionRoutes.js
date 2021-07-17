const express = require('express');
const predictionController = require('../controllers/predictionController');

const router = express.Router();

router
  .route('/')
  .post(predictionController.postPrediction)
  .patch(predictionController.updatePrediction);

module.exports = router;
