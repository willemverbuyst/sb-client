module.exports = (currentPassword, newPassword, confirmPassword) =>
  !!currentPassword &&
  !!newPassword &&
  !!confirmPassword &&
  typeof currentPassword === 'string' &&
  typeof newPassword === 'string' &&
  typeof confirmPassword === 'string';
