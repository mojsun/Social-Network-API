const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  //reaction,
  //removeVideoResponse,
} = require("../../controllers/thoughtController");

// /api/videos
router.route("/").get(getThought).post(createThought);

// /api/videos/:videoId
router
  .route("/:videoId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/videos/:videoId/reactions
// router.route("/:videoId/reactions").post(reactions);

// /api/videos/:videoId/responses/:responseId
// router.route("/:videoId/responses/:responseId").delete(removeVideoResponse);

module.exports = router;
