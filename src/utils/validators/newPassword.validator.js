module.exports = (newPassword, currentPassword) =>
  !!newPassword &&
  !!currentPassword &&
  typeof newPassword === 'string' &&
  typeof currentPassword === 'string' &&
  newPassword !== currentPassword;
