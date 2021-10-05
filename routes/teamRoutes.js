const express = require('express');
const authController = require('../controllers/authController');
const { teamControllers } = require('../controllers');

const { getAllTeamsController } = teamControllers;

const router = express.Router();

router.route('/').get(authController.protect, getAllTeamsController);

module.exports = router;
