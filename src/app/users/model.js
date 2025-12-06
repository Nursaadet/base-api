const mongoose = require("mongoose");
const userShema = new mongoose.Schema(
  {
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
      code: {
        type: String,
        default: null, // sadece code alanı için null verilebilir
      },
    },

    time: {
      type: String,
      default: undefined,
    },
  },
  { collections: "users", timestamps: true }
);

const user = mongoose.model("User", userShema);

module.exports = user;
