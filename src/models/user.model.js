const mongoose = require("mongoose");
const userShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  reset: {
    code: String,
    default: null,
  },
  time: {
    type: Date,
    default: null,
  }

},{collections: "users", timestamps: true})

const user = mongoose.model("User", userShema)

    module.exports = user