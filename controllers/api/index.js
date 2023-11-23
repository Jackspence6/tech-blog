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

// Catch-all route for unmatched API paths
router.get("/*", (req, res) => {
	res.status(404).json({
		message: "Not Found!",
		error: "The requested API endpoint does not exist!",
	});
});

// Exports
module.exports = router;
