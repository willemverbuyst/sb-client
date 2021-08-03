const validateSignupInput = ({
  userName,
  firstName,
  lastName,
  email,
  password,
  phoneNumber,
  teamId,
}) =>
  !!userName &&
  !!firstName &&
  !!lastName &&
  !!email &&
  !!password &&
  !!phoneNumber &&
  !!teamId &&
  typeof userName === 'string' &&
  typeof firstName === 'string' &&
  typeof lastName === 'string' &&
  typeof email === 'string' &&
  typeof password === 'string' &&
  typeof phoneNumber === 'string' &&
  typeof teamId === 'number';

module.exports = validateSignupInput;
