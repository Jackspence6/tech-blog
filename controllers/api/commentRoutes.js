// Imports & supporting NPM modules
const router = require("express").Router();
const { Comments } = require("../../models");

// Route to add comment to blog post
router.post("/", async (req, res) => {
	if (!req.session.logged_in) {
		return res.status(401).send("You must be logged in to comment!");
	}

	try {
		const commentData = await Comments.create({
			...req.body,
		});

		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
