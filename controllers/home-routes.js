// Imports & supporting NPM modules
const router = require("express").Router();
const { Blogs, Comments, Users } = require("../models");

// Route to get all Blogs
router.get("/", async (req, res) => {
	try {
		const blogData = await Blogs.findAll({
			include: [
				{
					model: Users,
					attributes: ["username"],
				},
				{
					model: Comments,
					include: ["content"],
				},
			],
		});

		// Serializing data so template can read it
		const blogs = blogData.map((blog) => blog.get({ plain: true }));

		// Passing serialized data into template
		res.render("homepage", {
			blogs,
		});
	} catch (err) {
		// Catching any errors
		res.status(500).render({ message: "❌Error fetching blog posts!" });
	}
});

// Exports
module.exports = router;
