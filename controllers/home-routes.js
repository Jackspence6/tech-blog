// Imports & supporting NPM modules
const router = require("express").Router();
const { Blogs, Comments, Users } = require("../models");
const { route } = require("./home-routes");

// Route to get all Blogs along with their associated Comments and Users
router.get("/", async (req, res) => {
	try {
		const blogData = await Blogs.findAll({
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
		res
			.status(500)
			.render("errorPage", { message: "❌Error fetching blog posts!" });
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
