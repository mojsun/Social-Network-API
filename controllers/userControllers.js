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
};
