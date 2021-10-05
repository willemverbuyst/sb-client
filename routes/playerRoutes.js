const express = require('express');
const authController = require('../controllers/authController');
const { playerControllers } = require('../controllers');

const {
  deletePlayerController,
  getAllPlayersController,
  signupPlayerController,
} = playerControllers;

const router = express.Router();

router.route('/').get(authController.protect, getAllPlayersController);

router
  .route('/signup')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    signupPlayerController,
  );

router
  .route('/:id')
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    deletePlayerController,
  );

module.exports = router;
