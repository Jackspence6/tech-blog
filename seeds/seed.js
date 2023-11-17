// Imports & supporting NPM modules
const sequelize = require("../config/connection");
const { Blogs, Comments, Users } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
	// Reset db
	await sequelize.sync({ force: true });

	console.log({ Blogs, Comments, Users });

	// Seed Users
	await Users.bulkCreate(userData);

	// Seed Blogs
	await Blogs.bulkCreate(blogData);

	// Seed Comments
	await Comments.bulkCreate(commentData);

	console.log("All tables have been successfully seeded!🌱");
};

// Calling the seedDatabase function
seedDatabase()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("❌Failed to seed database:", err);
		process.exit(1);
	});
