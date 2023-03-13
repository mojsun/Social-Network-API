const { Schema, model } = require("mongoose");

//schema to create user model
const userSchema = new Schema({
  username: { type: String, Required: true, Unique: true, Trimmed: true },
  email: { type: String, Required: true, Unique: true },
});
