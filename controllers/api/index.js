// Imports & supporting NPM modules
const router = require("express").Router();
const postRoutes = require("./postRoutes");
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");

// Middleware
router.use("./posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);

// Exports
module.exports = router;
