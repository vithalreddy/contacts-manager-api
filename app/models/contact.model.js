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
      match: [
        /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
        "Please Provide A Valid Contact Number"
      ],
      required: [true, "Number is a Required Field"],
      minlength: [10, "Invalid Contact Number"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", schema);
