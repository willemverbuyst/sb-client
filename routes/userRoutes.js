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
    authController.restrictTo('admin'),
    userController.getUserById,
  )
  .patch(authController.protect, userController.updateUserProfile)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser,
  );

router
  .route('/:id/predictions')
  .get(
    authController.protect,
    userController.getUserWithPredictionsAndScoresPastFixtures,
  );

router
  .route('/me/fixtures')
  .get(authController.protect, userController.getAllFixturesForLoggedInUser);

module.exports = router;
