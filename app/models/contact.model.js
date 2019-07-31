const mongoose = require("mongoose");
const User = require("./user.model");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.ObjectId,
      required: true,
      ref: User
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, "Contact Name is a Required Field"],
      index: true,
      maxlength: 250
    },
    number: {
      type: String,
      trim: true,
      index: true,
      required: [true, "Number is a Required Field"],
      maxlength: [15, "Number Length can't be more than 15"],
      minlength: [10, "Number Length can't be less than 10"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", schema);
