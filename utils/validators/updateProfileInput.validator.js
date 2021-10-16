const validateUpdateProfileInput = (
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  teamId,
) =>
  !!userName &&
  !!firstName &&
  !!lastName &&
  !!email &&
  !!phoneNumber &&
  !!teamId &&
  typeof userName === 'string' &&
  typeof firstName === 'string' &&
  typeof lastName === 'string' &&
  typeof email === 'string' &&
  typeof phoneNumber === 'string' &&
  typeof teamId === 'number';

module.exports = validateUpdateProfileInput;
