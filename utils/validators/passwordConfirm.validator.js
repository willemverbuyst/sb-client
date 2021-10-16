module.exports = (password, passwordConfirm) =>
  !!password &&
  !!passwordConfirm &&
  typeof password === 'string' &&
  typeof passwordConfirm === 'string' &&
  password === passwordConfirm;
