// Imports & supporting NPM modules
const router = require("express").Router();
const { Blogs, Comments, Users } = require("../../models");

// Route to get user dashboard
router.get("/", async (req, res) => {
	try {
		const user_id = req.session.user_id;

		if (!user_id) {
			res.status(401).json({ message: "User not authenticated" });
			return;
		}

		const dashboardData = await Blogs.findAll({
			where: { user_id: user_id },
		});

		if (!!dashboardData || dashboardData.length === 0) {
			res.status(400).json({ message: "No Blogs found matching your Id!" });
			return;
		}

		const dashboard = dashboardData.map((dashboard) =>
			dashboard.get({ plain: true })
		);

		res.render("homepage", {
			dashboard,
			on_dashboard: true,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// Exports
module.exports = router;
