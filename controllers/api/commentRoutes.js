// Imports & supporting NPM modules
const router = require("express").Router();
const { Comments } = require("../../models");
require("../../models/Blogs");

// Route to add comment to blog post
router.post("/", async (req, res) => {
	if (!req.session.logged_in) {
		return res.status(401).send("You must be logged in to comment!");
	}

	try {
		const { content, blog_id } = req.body;
		const user_id = req.session.user_id;

		// Creating a new comment
		const commentData = await Comments.create({
			content,
			blog_id,
			user_id,
		});

		res.status(200).json(commentData);
	} catch (err) {
		console.error(err);
		res.status(500).json(err);
	}
});

// Route to delete individual comment by id
router.delete("/:id", async (req, res) => {
	try {
		const commentData = await Comments.destroy(req.params.id, {
			where: {
				id: req.params.id,
			},
		});

		if (!commentData) {
			res.status(404).json({ message: "No comment found with this ID!" });
			return;
		}

		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
