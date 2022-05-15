const express = require('express');
const { authControllers, userControllers } = require('../controllers');

const {
  changedPasswordController,
  forgotPasswordController,
  loginController,
  protectController,
  resetPasswordController,
  validTokenController,
} = authControllers;
const { updateUserProfileController } = userControllers;

const router = express.Router();

router.route('/login').post(loginController);

router.route('/forgotPassword').post(forgotPasswordController);

router.route('/resetPassword/:token').patch(resetPasswordController);

router
  .route('/changePassword')
  .patch(protectController, changedPasswordController);

router.route('/me').get(protectController, validTokenController);

router.route('/profile').patch(protectController, updateUserProfileController);

module.exports = router;
