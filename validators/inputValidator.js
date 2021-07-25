const bcrypt = require('bcrypt');

const validateLoginInput = (email, password) => !(!email || !password);

const validatePassword = (user, password) =>
  !(!user || !bcrypt.compareSync(password, user.password));

const validatePasswordConfirm = (password, passwordConfirm) =>
  password === passwordConfirm;

const validatePredictionInput = (pGoalsHomeTeam, pGoalsAwayTeam, fixtureId) =>
  !(
    typeof pGoalsHomeTeam !== 'number' ||
    typeof pGoalsAwayTeam !== 'number' ||
    !fixtureId
  );

const validateProfileInput = ({
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  teamId,
}) =>
  !(!userName || !firstName || !lastName || !email || !phoneNumber || !teamId);

const validateSignupInput = ({
  userName,
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  teamId,
}) =>
  !(
    !userName ||
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !teamId
  );

const validateUpdatePassword = (newPassword) => !!newPassword;

module.exports = {
  validateLoginInput,
  validatePassword,
  validatePasswordConfirm,
  validateProfileInput,
  validatePredictionInput,
  validateSignupInput,
  validateUpdatePassword,
};
