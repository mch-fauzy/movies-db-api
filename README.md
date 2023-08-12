# Movies CRUD API with Authentication and Authorization

This is a CRUD (Create, Read, Update, Delete) API for managing movie records with user authentication. The API allows you to perform various operations on movies and users using different endpoints.

**Note: This is for mock only, need adjustment if want to use in the production environment**

## Features

- User registration and login functionality
- Secure authentication using JWT (JSON Web Tokens)
- Create, Read, Update, and Delete operations for movie records
- Authorization for admin-only actions

## Getting Started

To get started with the API, follow the steps below:

1. Clone this repository: `git clone https://github.com/mch-fauzy/movies-crud-api-auth.git`
2. Navigate to the project directory: `cd movies-crud-api-auth`
3. Install the required dependencies
4. Edit the database configuration in `.env` with your PostgreSQL credentials.
5. Import the required database schema from `migrations/movie-database.sql` into your PostgreSQL database using a tool like pgAdmin's restore function.
6. Start the server: `node app.js`

The API will be available at http://localhost:3000.

## Swagger Documentation

To access the API documentation using Swagger, follow these steps:

1. Make sure the server is running locally.
2. Open your web browser and go to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/).
3. You'll see the Swagger UI interface with a list of endpoints, request parameters, and example requests/responses.
4. You can interact with the API directly from the Swagger interface.

**NOTE: Swagger documentation does not have upload file API**

## API Endpoints

### Public Endpoints

- `POST /v1/register`: Register a new user. Requires `email`, `gender`, `password`, and `role` fields in the request body. (Ideally role only can be set by admin)
- `POST /v1/login`: User login. Requires `email` and `password` fields in the request body.

### Users Endpoints

- `GET /v1/users`: Get all users with pagination. Requires authentication and admin role. Parameters `page` (default: 1) and `size` (default: 10) are optional for pagination.

### Movies Endpoints

- `GET /v1/movies`: Get all movies with pagination. Requires authentication. Parameters `page` (default: 1) and `size` (default: 10) are optional for pagination.
- `POST /v1/movies`: Insert a new movie. Requires authentication and admin role. Requires `title`, `genres`, and `year` fields in the request body.
- `POST v1/movies/:id/upload`: Upload a photo into movie table. Requires authentication and admin role. Requires `file` to upload in the request body
- `DELETE /v1/movies/:id`: Delete a movie by ID. Requires authentication and admin role.
- `PUT /v1/movies/:id`: Update a movie by ID. Requires authentication and admin role. Requires `title`, `genres`, and `year` fields in the request body.

## Error Handling

The API provides appropriate error messages and status codes for various scenarios, including invalid requests, authentication failures, and internal server errors.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests for enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
