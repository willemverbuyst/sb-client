const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').post(authController.login);
router
  .route('/signup')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    authController.signup,
  );
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').post(authController.resetPassword);

router.route('/').get(authController.protect, userController.getAllUsers);

router
  .route('/:id')
  .get(
    authController.protect,
    userController.getUserWithPredictionsAndScoresPastFixtures,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

module.exports = router;
