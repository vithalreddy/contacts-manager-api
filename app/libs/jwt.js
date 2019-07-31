const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = {
  sign: payload =>
    jwt.sign(payload, config.authSecret, { expiresIn: "2 days" }),
  verify: token => {
    try {
      return jwt.verify(token, config.authSecret);
    } catch (error) {
      return false;
    }
  }
};
