const validateLoginInput = (email, password) =>
  !!email &&
  !!password &&
  typeof email === 'string' &&
  typeof password === 'string';

module.exports = validateLoginInput;
