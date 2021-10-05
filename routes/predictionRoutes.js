const express = require('express');
const authController = require('../controllers/authController');
const { predictionControllers } = require('../controllers');

const {
  getAllPredictionsController,
  postPredictionController,
  updatePredictionController,
} = predictionControllers;

const router = express.Router();

router
  .route('/player/:id')
  .get(authController.protect, getAllPredictionsController);

router
  .route('/:id')
  .post(authController.protect, postPredictionController)
  .patch(authController.protect, updatePredictionController);

module.exports = router;
