// Imports & supporting NPM modules
const router = require("express").Router();
const { Users } = require("../../models");

// Route to create a new user
router.post("/", async (req, res) => {
	try {
		const userData = await Users.create(req.body);
		res.status(200).json(userData);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Exports
module.exports = router;
