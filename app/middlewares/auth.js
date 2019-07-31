const Boom = require("boom");

const User = require("../models/user.model");
const jwt = require("../libs/jwt");

const publicRoutes = ["api/v1/auth/login", "api/v1/auth/register"];

module.exports = async (err, req, res, next) => {
  console.log(req.path);

  if (publicRoutes.includes(req.path)) return next();

  let token = req.headers.authorization || req.query.token;

  if (!token) {
    return next(Boom.notFound("Invalid Auth Token."));
  }

  token = token.split(" ");
  if (token.length === 2) token = token[1];
  else token = token[0];

  const jwtPayload = jwt.verify(token);

  if (!jwtPayload) {
    return next(Boom.notFound("Invalid Auth Token."));
  }

  const user = await User.findOne({ email }, "_id email fullName").lean();

  if (!user) {
    return next(Boom.notFound("User with This Email Not Found."));
  }

  req.user = user;

  next();
};
