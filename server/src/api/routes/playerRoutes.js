const express = require('express');
const { authControllers, playerControllers } = require('../controllers');

const { protectController, restrictToController } = authControllers;
const {
  deletePlayerController,
  getAllPlayersController,
  signupPlayerController,
} = playerControllers;

const router = express.Router();

router.route('/').get(protectController, getAllPlayersController);

router
  .route('/signup')
  .post(
    protectController,
    restrictToController('admin'),
    signupPlayerController,
  );

router
  .route('/:playerId')
  .delete(
    protectController,
    restrictToController('admin'),
    deletePlayerController,
  );

module.exports = router;
