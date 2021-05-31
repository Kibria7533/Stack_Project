const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: String,
     email:String
  }, 
  { timestamps: true }
);

module.exports = model("users", UserSchema);

