// Imports & supporting NPM modules
const express = require("express");
const session = require("express-session");
require("dotenv").config();
const path = require("path");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// Initializing the express server
const app = express();
const PORT = process.env.PORT || 3001;

// Session configuration
const sess = {
	secret: process.env.SESS_SECRET,
	cookie: {
		// 1 Day
		maxAge: 86400,
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

// Setting up Handlebars engine with helpers
const hbs = exphbs.create({ helpers });

// Middleware
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Informing Express on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

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
