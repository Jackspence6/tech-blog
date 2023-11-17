// Imports & supporting NPM modules
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");

// Turning on router
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

// Exports
module.exports = router;
