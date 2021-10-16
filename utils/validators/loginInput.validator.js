module.exports = (email, password) =>
  !!email &&
  !!password &&
  typeof email === 'string' &&
  typeof password === 'string';
