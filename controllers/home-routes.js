// Imports & supporting NPM modules
const router = require("express").Router();
const { Blogs, Comments, Users } = require("../models");
require("./home-routes");

// Route to get all Blogs along with their associated info
router.get("/", async (req, res) => {
	try {
		const blogData = await Blogs.findAll({
			include: [
				{
					model: Users,
					attributes: ["username"],
				},
			],
			attributes: ["id", "title", "content", "date_created", "user_id"],
		});

		// Serializing data so the template can read it
		const blogs = blogData.map((blog) => blog.get({ plain: true }));

		// Passing serialized data into the Handlebars template
		res.render("homepage", {
			blogs,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		// Catching and handling any errors
		res.status(500).json({ message: "❌Error fetching blog posts!" });
	}
});

// Route to get individual blog by Id and associated info
router.get("/blogs/:id", async (req, res) => {
	try {
		const blogData = await Blogs.findByPk(req.params.id, {
			include: [
				{
					model: Comments,
					attributes: ["id", "content", "date_created", "user_id"],
					include: {
						model: Users,
						attributes: ["username"],
					},
				},
				{
					model: Users,
					attributes: ["username"],
				},
			],
			attributes: ["title", "content", "date_created"],
		});

		// Serializing data so the template can read it
		const blogs = blogData.get({ plain: true });

		// Passing serialized data into the Handlebars template
		res.render("blogs", {
			blogs,
			logged_in: req.session.logged_in,
			on_blogPage: true,
		});
	} catch (err) {
		// Catching and handling any errors
		res.status(500).json({ message: "❌Error fetching blog post!" });
	}
});

// Route to redirect user to login page if not already logged in
router.get("/login", async (req, res) => {
	try {
		if (req.session.logged_in) {
			res.redirect("/dashboards");
			return;
		}
		res.render("login");
	} catch (err) {
		res.status(400).json(err);
	}
});

// Exports
module.exports = router;
