const User = require("../models/User");

module.exports = {
  getUsers: async function (req, res) {
    const allUsers = await User.find({});

    res.json(allUsers);
  },
  createUser: async function (req, res) {
    const newUser = await User.create(req.body);

    res.json(newUser);
  },
  getSingleUser: async function (req, res) {
    const userId = req.params.userId;
    const userInfo = await User.findById(userId);
    res.json(userInfo);
  },
  updateUser: async function (req, res) {
    const userId = req.params.userId;

    const updatedUser = await User.findOneAndUpdate(
      {
        where: {
          _id: userId,
        },
      },
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  },
  deleteUser: async function (req, res) {
    const userId = req.params.userId;
    res.json("single user");
  },
  // add a user friend
  addUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { responses: req.body } },
      { runValidators: true, new: true }
    )
      .then((video) =>
        !User
          ? res.status(404).json({ message: "No User with this id!" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete user friend
  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { reactions: { responseId: req.params.responseId } } },
      { runValidators: true, new: true }
    )
      .then((User) =>
        !User
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(User)
      )
      .catch((err) => res.status(500).json(err));
  },
};
