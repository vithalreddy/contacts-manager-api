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
        /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
        "Please Provide A Email Address"
      ],
      required: [true, "Number is a Required Field"]
    }
  },
  { timestamps: true }
);

// above regex will support following patterns
// (123) 456-7890
// +(123) 456-7890
// +(123)-456-7890
// +(123) - 456-7890
// +(123) - 456-78-90
// 123-456-7890
// 123.456.7890
// 1234567890
// +31636363634
// 075-63546725

module.exports = mongoose.model("Contact", schema);
