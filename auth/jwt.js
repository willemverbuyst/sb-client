const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/constants');

const toJWT = (data) => jwt.sign(data, jwtSecret, { expiresIn: '1h' });

const toData = (token) => jwt.verify(token, jwtSecret);

module.exports = { toJWT, toData };
