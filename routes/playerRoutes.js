const express = require('express');
const { authControllers, playerControllers } = require('../controllers');

const { protectController } = authControllers;
const {
  deletePlayerController,
  getAllPlayersController,
  signupPlayerController,
} = playerControllers;

const router = express.Router();

router.route('/').get(protectController, getAllPlayersController);

router.route('/signup').post(
  protectController,
  // authController.restrictTo('admin'),
  signupPlayerController,
);

router.route('/:id').delete(
  protectController,
  // authController.restrictTo('admin'),
  deletePlayerController,
);

module.exports = router;
