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
DB_NAME="tech_blog_db"
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

API routes include:

- `GET /api/posts` - Retrieves all blog posts
- `GET /api/posts/:id` - Retrieves a blog post by ID
- `POST /api/posts` - Creates a new blog post
- `PUT /api/posts/:id` - Updates a blog post by ID
- `DELETE /api/posts/:id` - Deletes a blog post by ID

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss your suggestions or improvements.

## License

[MIT](LICENSE)

## Contact

GitHub: [Jackspence6](https://github.com/Jackspence6)  
Email: [jackspence.dev@gmail.com](mailto:jackspence.dev@gmail.com)
