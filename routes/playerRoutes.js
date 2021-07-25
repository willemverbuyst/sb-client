const express = require('express');
const authController = require('../controllers/authController');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.route('/').get(authController.protect, playerController.getAllPlayers);

router
  .route('/signup')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    playerController.signupPlayer,
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    playerController.deletePlayer,
  );

module.exports = router;
