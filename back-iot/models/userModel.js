const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !!!!"],
  },
  email: {
    type: String,
    required: [true, "E-mail is required !!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Plz set a valid e-mail !!!"],
  },
  password: {
    type: String,
    required: [true, "Password is required !!!!"],
    minlength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "Password is required !!!!"],
    minlength: 8,
    validate: {
      validator: function (cPass) {
        return cPass === this.password;
      },
      message: "cPass is not valid !!!!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  pass_change_time: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  this.confirmPassword = undefined;
  return next();
});

userSchema.methods.isPasswordValid = async function (
  crypdetPassword,
  userPassword
) {
  return await bcryptjs.compare(userPassword, crypdetPassword);
};

userSchema.methods.verifyToken = function (tokenIAT) {
  return parseInt(this.pass_change_time.getTime() / 1000) > tokenIAT;
};
const User = mongoose.model("User", userSchema);

module.exports = User;
