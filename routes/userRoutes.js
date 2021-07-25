const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);

router.route('/resetPassword/:token').patch(authController.resetPassword);

router
  .route('/updatePassword')
  .patch(authController.protect, authController.updatePassword);

router.route('/me').get(authController.protect, authController.validToken);

router
  .route('/profile')
  .patch(authController.protect, userController.updateUserProfile);

module.exports = router;
