// Imports & supporting NPM modules
const router = require("express").Router();
const apiRoutes = require("./api");

// Turning on router
router.use("/api", apiRoutes);

// Exports
module.exports = router;
