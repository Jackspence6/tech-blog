// Imports & supporting NPM modules
const router = require("express").Router();
const blogRoutes = require("./blogRoutes");
const commentRoutes = require("./commentRoutes");
const userRoutes = require("./userRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// Middleware
router.use("/blogs", blogRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/dashboards", dashboardRoutes);

// Exports
module.exports = router;
