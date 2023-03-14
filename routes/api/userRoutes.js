const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  AddThought,
} = require("../../controllers/userControllers");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/users/:userId/friend/:friendId
router.route("/:userId/friend/").post(AddUserFriend);
// /api/users/:userId/friend/:friendId
router.route("/:userId/friend/:friendId").delete(deleteUserFriend);
module.exports = router;
