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
    console.log(req.params);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.id } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // delete user friend
  //   deleteUserFriend(req, res) {
  //     console.log(req.params);
  //     User.findOneAndUpdate(
  //       { _id: req.params.userId },
  //       { $pull: { friends: { id: req.params.friendId } } },
  //       { runValidators: true, new: true }
  //     )
  //       .then((user) =>
  //         !user
  //           ? res.status(404).json({ message: "No user with this id!" })
  //           : res.json(user)
  //       )
  //       .catch((err) => res.status(500).json(err));
  //   },

  deleteUserFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },
};
