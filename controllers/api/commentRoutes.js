// Imports & supporting NPM modules
const router = require("express").Router();
const { Comments } = require("../../models");

// Route to add comment to blog post
router.post("/", async (req, res) => {
	if (!req.session.userId) {
		return res.status(401).send("You must be logged in to comment!");
	}

	try {
		await Comments.create({
			content: req.body.content,
			postId: req.body.blog_id,
			userId: req.session.user_id,
			dateCreated: req.body.date_created,
		});

		res.redirect(`/posts/${req.body.blog_id}`);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
