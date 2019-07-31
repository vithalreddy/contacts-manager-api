const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full Name is a Required Field"],
      index: true,
      maxlength: 250
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is a Required Field"],
      unique: true,
      match: [/a/, "Please Provide A Email Address"],
      maxlength: 150
    },
    password: {
      type: String,
      required: [true, "Password is a Required Field"]
    }
  },
  { timestamps: true }
);

schema.pre("save", function(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

schema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

module.exports = mongoose.model("User", schema);
