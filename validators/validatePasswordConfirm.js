const validatePasswordConfirm = (password, passwordConfirm) =>
  !!password &&
  !!passwordConfirm &&
  typeof password === 'string' &&
  typeof passwordConfirm === 'string' &&
  password === passwordConfirm;

module.exports = validatePasswordConfirm;
