const jwt = require('jsonwebtoken');

const toJWT = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const toData = (token) => jwt.verify(token, process.env.JWT_SECRET);

module.exports = { toJWT, toData };
