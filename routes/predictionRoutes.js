const express = require('express');
const predictionController = require('../controllers/predictionController');

const router = express.Router();

router.post('/', predictionController.postPrediction);

module.exports = router;
