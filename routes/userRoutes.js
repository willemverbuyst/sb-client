const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserWithPredictionsAndScoresPastFixtures)
  .delete(userController.deleteUser);

module.exports = router;
