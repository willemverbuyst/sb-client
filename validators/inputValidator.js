const bcrypt = require('bcrypt');

const validateLoginInput = (email, password) =>
  !email || !password ? false : true;

const validatePassword = (user, password) =>
  !user || !bcrypt.compareSync(password, user.password) ? false : true;

const validatePredictionInput = (pGoalsHomeTeam, pGoalsAwayTeam, fixtureId) =>
  typeof pGoalsHomeTeam !== 'number' ||
  typeof pGoalsAwayTeam !== 'number' ||
  !fixtureId
    ? false
    : true;

const validateProfileInput = ({
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  teamId,
}) =>
  !userName || !firstName || !lastName || !email || !phoneNumber || !teamId
    ? false
    : true;

const validateSignupInput = ({
  userName,
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  teamId,
}) =>
  !userName ||
  !firstName ||
  !lastName ||
  !email ||
  !password ||
  !phoneNumber ||
  !teamId
    ? false
    : true;

module.exports = {
  validateLoginInput,
  validatePassword,
  validateProfileInput,
  validatePredictionInput,
  validateSignupInput,
};
