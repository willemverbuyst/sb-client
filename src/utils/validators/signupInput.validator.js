module.exports = (
  userName,
  firstName,
  lastName,
  email,
  phoneNumber,
  totaalToto,
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
  typeof teamId === 'number' &&
  typeof totaalToto === 'boolean';
