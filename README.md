# Movies CRUD API with Authentication and Authorization

This is a CRUD (Create, Read, Update, Delete) API for managing movie records with user authentication. The API allows you to perform various operations on movies and users using different endpoints.

You can try the API in [here](https://movies-db-api.vercel.app) or deploy it manually below.

**Note: This is for mock only, adjustments are needed if you want to use it in a production environment**

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Swagger Documentation](#swagger-documentation)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login functionality
- Secure authentication using JWT (JSON Web Tokens)
- Create, Read, Update, and Delete operations for movie records
- Authorization for admin-only actions
- Upload photos for movie records

## Getting Started

To get started with the API, follow the steps below:

1. Clone this repository: 
    ```
    git clone https://github.com/mch-fauzy/movies-db-api.git
    ```

2. Navigate to the project directory: 
    ```
    cd movies-db-api
    ```
3. Install the required dependencies:
   ```
   npm install
   ```

4. Edit the database configuration in `.env` with your PostgreSQL credentials and configure the setting in `./infras/postgresql.js`.
5. Import the required database schema from `migrations/movie-database.sql` into your PostgreSQL database using a tool like pgAdmin's restore function.
6. Start the server: 
    ```
    npm run dev
    ```

The API will be available at [http://localhost:3000](http://localhost:3000).

## Swagger Documentation

To access the API documentation using Swagger, follow these steps:

1. Make sure the server is running locally.
2. Open your web browser and go to [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/).
3. You'll see the Swagger UI interface with a list of endpoints, request parameters, and example requests/responses.
4. You can interact with the API directly from the Swagger interface.

**NOTE: Swagger documentation does not have upload file Endpoint**

Certainly! Here's a simplified version of the API Endpoints section for easier readability:

## API Endpoints

### Public Endpoints

#### Register a New User
- **Endpoint:** `POST /v1/auth/register`
- **Description:** Register a new user (first admin can be seeded)
- **Request Body Parameters:** `email`, `gender`, `password`

#### Login
- **Endpoint:** `POST /v1/auth/login`
- **Description:** User login.
- **Request Body Parameters:** `email`, `password`
- **Example:**
```
Admin:
    email: admin@gmail.com
    password: adminpassword
```

```
Non-Admin:
    email: non.admin@gmail.com
    password: nonadminpassword
```


### Users Endpoints

#### Get All Users
- **Endpoint:** `GET /v1/users`
- **Description:** Get all users with pagination.
- **Authentication:** Requires authentication and admin role.
- **Query Parameters:** `page` (default: 1), `size` (default: 10)

### Movies Endpoints

#### Get All Movies
- **Endpoint:** `GET /v1/movies`
- **Description:** Get all movies with pagination.
- **Authentication:** Requires authentication.
- **Query Parameters:** `page` (default: 1), `size` (default: 10)

#### Insert a New Movie
- **Endpoint:** `POST /v1/movies`
- **Description:** Insert a new movie.
- **Authentication:** Requires authentication and admin role.
- **Request Body Parameters:** `title`, `genres`, `year`

#### Upload Movie Photo
- **Endpoint:** `POST /v1/movies/:id/upload`
- **Description:** Upload a photo for a movie.
- **Authentication:** Requires authentication and admin role.
- **Request Body Parameters:** `file` (photo)
- **Path Parameter:** `id` (movie ID)
- **Notes:** The uploaded image is stored in the `public/images` directory and associated with the specified movie.

#### Delete a Movie
- **Endpoint:** `DELETE /v1/movies/:id`
- **Description:** Delete a movie by ID.
- **Authentication:** Requires authentication and admin role.
- **Path Parameter:** `id` (movie ID)

#### Update a Movie
- **Endpoint:** `PUT /v1/movies/:id`
- **Description:** Update a movie by ID.
- **Authentication:** Requires authentication and admin role.
- **Path Parameter:** `id` (movie ID)
- **Request Body Parameters:** `title`, `genres`, `year`

## Error Handling

The API provides appropriate error messages and status codes for various scenarios, including invalid requests, authentication failures, and internal server errors.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests for enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.