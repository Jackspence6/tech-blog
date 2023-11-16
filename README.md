# Tech Blog: A Developer's Tech Blog Platform

## Description

A CMS-style tech blogging platform built from the ground up. This project is more than just a blog; it's a community where developers can share, learn, and grow together.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Clone the repository to your local machine:

```
git clone git@github.com:Jackspence6/tech-blog.git
```

Navigate to the application directory and install dependencies:

```
npm install
```

## Configuration

Set up your environment variables. Create a `.env` file in the root directory with the following content:

```
DB_NAME="techBlog_db"
DB_USER="[your_mysql_username]"
DB_PW="[your_mysql_password]"
```

## Database Setup

Create the database using the provided schema:

```
source db/schema.sql
```

Seed the database with initial data:

```
npm run seed
```

## Usage

Start the server and sync the Sequelize models to the MySQL database:

```
npm start
```

The application will be running on `localhost:3001`.

## API Routes

### User Authentication and Management Routes

- `POST /api/users/login` - Authenticate and log in a user.
- `POST /api/users/signup` - Register a new user.
- `POST /api/users/logout` - Log out a user.
- `GET /api/users/profile` - Get the logged-in user's profile (requires authentication).

### Blog Post Management Routes

- `GET /api/posts` - Retrieve all blog posts.
- `GET /api/posts/:id` - Retrieve a specific blog post.
- `POST /api/posts` - Create a new blog post (requires authentication).
- `PUT /api/posts/:id` - Update an existing blog post (requires authentication).
- `DELETE /api/posts/:id` - Delete a blog post (requires authentication).

### Comment Routes

- `POST /api/comments` - Add a comment to a blog post (requires authentication).
- `DELETE /api/comments/:id` - Delete a comment (requires authentication).

### Dashboard Routes

- `GET /api/dashboard` - Get the user's dashboard data, including their posts (requires authentication).

### Error and Miscellaneous Routes

- `GET /api/*` - Handle any unmatched API routes, returning a 404 JSON response.

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss your suggestions or improvements.

## License

[MIT](LICENSE)

## Contact

GitHub: [Jackspence6](https://github.com/Jackspence6)  
Email: [jackspence.dev@gmail.com](mailto:jackspence.dev@gmail.com)
