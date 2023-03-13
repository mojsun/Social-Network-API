const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

// Schema to create Post model
const Thought = new Schema({
  thoughtText: {
    type: String,
    Required: true,
    length: [280],
  },
  createdAt: {
    default: Date.now,
    
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
  Username: {
    type: String,
    Required: true,
  },
  reactions: [reactionSchema],
});

module.exports = Thought;
