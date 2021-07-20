const express = require('express');
const authController = require('../controllers/authController');
const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.route('/totaltoto').get(scoreController.getScoresTotalToto);

module.exports = router;
// authController.protect,
