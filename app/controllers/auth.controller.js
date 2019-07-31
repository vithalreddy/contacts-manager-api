const Boom = require("boom");

const User = require("../models/user.model");
const jwt = require("../libs/jwt");

const ctrl = {};
module.exports = ctrl;

ctrl.register = async (req, res, next) => {
  const { email, fullName, password } = req.body;

  const isDuplicate = await User.findOne(
    {
      email: {
        $regex: email,
        $options: "i"
      }
    },
    "_id"
  ).lean();

  if (isDuplicate) {
    return next(Boom.conflict("User with This Email Already Exists."));
  }

  const user = await new User({ fullName, password, email }).save();

  res.status(201).json({ email: user.email });
};

ctrl.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(Boom.notFound("User with This Email Not Found."));
  }

  if (!user.comparePassword(password)) {
    return next(Boom.forbidden("Invalid Email and/or Password."));
  }

  const token = jwt.sign({ email: user.email });

  res.status(201).json({ token });
};
