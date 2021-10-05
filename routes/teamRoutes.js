const express = require('express');
const { authControllers, teamControllers } = require('../controllers');

const { protectController } = authControllers;
const { getAllTeamsController } = teamControllers;

const router = express.Router();

router.route('/').get(protectController, getAllTeamsController);

module.exports = router;
