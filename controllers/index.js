// Imports & supporting NPM modules
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

// Turning on router
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// Catch-all route for unmatched home paths
router.get("/*", (req, res) => {
	res.status(404).json({
		message: "Not Found!",
		error: "The requested endpoint does not exist!",
	});
});

// Exports
module.exports = router;
