const router = require("express").Router();
// const thoughtRoutes = require("./thoughtRoutes");
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
// router.use("/thought", thoughtRoutes);
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);
module.exports = router;
