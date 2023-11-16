// Imports & supporting NPM modules
const express = require("express");
const session = require("express-session");
require("dotenv").config();
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initializing the express server
const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
	secret: process.env.SESS_SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turning Routes on
app.use(routes);

// Syncing sequelize models to the database, then turning on Server
sequelize
	.sync({ force: false })
	.then(() => {
		app.listen(PORT, () => {
			console.log(`App Now listening on port ${PORT}!🚀`);
		});
	})
	// Catching any errors when syncing sequelize models to the db & turning on Server
	.catch((err) => {
		console.error(err);
	});
