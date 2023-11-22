// Imports & supporting NPM modules
const router = require("express").Router();
const { Blogs, Comments, Users } = require("../../models");

// Route to get user dashboard
router.get("/", async (req, res) => {
	try {
		const user_id = req.session.user_id;

		if (!user_id) {
			res.redirect("/login");
			return;
		}

		const dashboardData = await Blogs.findAll({
			where: { user_id: user_id },
			include: [{ model: Users }],
		});

		const dashboard = dashboardData.map((post) => post.get({ plain: true }));

		res.render("dashboard", {
			blogs: dashboard,
			on_dashboard: true,
			noBlogs: dashboard.length === 0,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
