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

// Route to update an existing Blog Post
router.put("/:id", async (req, res) => {
	try {
		const { title, content } = req.body;
		const user_id = req.session.user_id;
		const blogId = req.params.id;

		// Authentication Check
		if (!user_id) {
			res.status(401).json({ message: "User not authenticated!" });
			return;
		}

		// Finding blog post by ID
		const blogData = await Blogs.findByPk(blogId);

		// Checking if blog post exists and belongs to the user
		if (!blogData || blogData.user_id !== user_id) {
			res.status(404).json({ message: "Blog post not found or unauthorized!" });
			return;
		}

		// Updating blog post
		await blogData.update({
			title: title || blogData.title,
			content: content || blogData.content,
		});

		res.status(200).json({ message: "Blog post updated successfully!" });
	} catch (err) {
		res.status(500).json(err);
	}
});

// Route to delete an existing Blog Post
router.delete("/:id", async (req, res) => {
	try {
		const blogData = await Blogs.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!blogData) {
			res.status(404).json({ message: "No Blog Post found with this ID!" });
			return;
		}

		res.status(200).json(blogData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
