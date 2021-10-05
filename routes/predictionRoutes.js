const express = require('express');
const { authControllers, predictionControllers } = require('../controllers');

const { protectController } = authControllers;
const {
  getAllPredictionsController,
  postPredictionController,
  updatePredictionController,
} = predictionControllers;

const router = express.Router();

router.route('/player/:id').get(protectController, getAllPredictionsController);

router
  .route('/:id')
  .post(protectController, postPredictionController)
  .patch(protectController, updatePredictionController);

module.exports = router;
