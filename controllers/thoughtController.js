const Thought = require("../models/Thought");
const User = require("../models/Thought");
module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((Thought) => res.json(Thought))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "No Thought with that Id" })
          : res.json(Thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create a new Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((Thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToset: { Thoughts: Thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that Id",
            })
          : res.json("Created the video")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.ThoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "no Thought with this id" })
          : res.json(Thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.ThoughtId })
      .then((Thought) =>
        !Thought
          ? res.status(404).json({ message: "no thought with this id!" })
          : User.findOneAndUpdate(
              { Thoughts: req.params.ThoughtId },
              { $pull: { Thought: req.params.ThaoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Thought created but no user with this is!" })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction stored in a single thought's reactions array field
  createReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((Thought) => {
        if (!Thought) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(Thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a reaction by the reaction's reactionId value
  deleteReaction: (req, res) => {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((Thought) => res.json(Thought))
      .catch((err) => res.json(err));
  },
};
