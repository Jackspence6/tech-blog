// Imports & supporting NPM modules
const router = require("express").Router();
const { Blogs } = require("../../models");

// Route to create a new Blog Post
router.post("/", async (req, res) => {
	try {
		const { title, content } = req.body;
		const user_id = req.session.user_id;

		// Authentication Check
		if (!user_id) {
			res.status(401).json({ message: "User not authenticated!" });
			return;
		}
		const blogData = await Blogs.create({
			title,
			content,
			user_id,
		});

		res.status(200).json(blogData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
