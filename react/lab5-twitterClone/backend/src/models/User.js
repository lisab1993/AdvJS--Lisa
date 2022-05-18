const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    //a users popularity, like karma on reddit
    feathers: {
      type: Number,
      default: 0,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

userSchema.statics.signup = async function (username, password, email) {
  //this is the whole model itself
  //and yes, we're using this() as a function
  const user = new this();
  user.username = username;
  user.hashPassword(password);
  user.email = email;

  await user.save();
  return user;
};

userSchema.methods.hashPassword = function (plainText) {
  this.password = bcrypt.hashSync(plainText, 4);
};

userSchema.methods.sanitize = function () {
  return {
    //takes our user model from this file (_doc), and grabs the properties and values we assign to it below, and returns it in a new object
    //it takes the user as it is, and replaces the password property with undefined; the rest of the user stays the same.
    ...this._doc,
    password: undefined,
  };
};

userSchema.methods.comparePasswords = function (
  plainText
) //check if the user entered the correct password
{
  return bcrypt.compareSync(plainText, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
