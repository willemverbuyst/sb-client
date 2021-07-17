const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

router.get('/', teamController.getAllTeams);

module.exports = router;
