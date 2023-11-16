// Imports
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Posts extends Model {}

// Added Properties to Posts Model
Posts.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
			references: {
				model: "users",
				key: "id",
			},
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		date_updated: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "posts",
	}
);

// Exports
module.exports = Posts;
