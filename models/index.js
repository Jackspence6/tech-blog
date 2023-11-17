// Imports & supporting NPM modules
const Blogs = require("./Blogs");
const Comments = require("./Comments");
const Users = require("./Users");

// Associations
Users.hasMany(Blogs, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Users.hasMany(Comments, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Blogs.belongsTo(Users, {
	foreignKey: "user_id",
});

Blogs.hasMany(Comments, {
	foreignKey: "blog_id",
	onDelete: "CASCADE",
});

Comments.belongsTo(Blogs, {
	foreignKey: "blog_id",
	onDelete: "CASCADE",
});

Comments.belongsTo(Users, {
	foreignKey: "user_id",
});

// Exports
module.exports = { Blogs, Comments, Users };
