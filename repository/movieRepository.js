const infras = require('../infras');

class MovieRepository {
    static async getMovies(page = 1, size = 10) {
        try {
            page = parseInt(page);
            size = parseInt(size);
            const offset = (page - 1) * size;
            const query = 'SELECT id, title, genres, year, image FROM movies LIMIT $1 OFFSET $2';
            const result = await infras.pool.query(query, [size, offset]);

            const totalRows = parseInt((await infras.pool.query('SELECT COUNT(*) FROM movies')).rows[0].count);
            const totalPages = Math.ceil(totalRows / size);

            const movies = result.rows

            return {
                data: movies,
                metadata: {
                    totalData: totalRows,
                    totalPages: totalPages,
                    currentPage: page,
                    nextPage: page < totalPages ? page + 1 : null,
                    previousPage: page > 1 ? page - 1 : null,
                }
            };
        } catch (error) {
            throw error;
        }
    }

    static async insertMovie(title, genres, year) {
        try {
          const query = 'INSERT INTO movies (id, title, genres, year) VALUES ($1, $2, $3, $4)';

          if (!title || !genres || !year) {
            throw new Error('title, genres and year fields are required');
        }
    
          const maxIdResult = await infras.pool.query('SELECT MAX(id) FROM movies');
          const maxId = maxIdResult.rows[0].max || 0;
          const id = maxId + 1;
    
          await infras.pool.query(query, [id, title, genres, year]);
        } catch (error) {
          throw error;
        }
      }

    static async uploadMovieImage(id, imageURL) {
        try {
            const movieExistsQuery = 'SELECT id FROM movies WHERE id = $1';
            const movieExistsResult = await infras.pool.query(movieExistsQuery, [id]);

            if (movieExistsResult.rows.length === 0) {
                throw new Error('Movie not found');
            }

            const query = 'UPDATE movies SET image = $2 WHERE id = $1';
            await infras.pool.query(query, [id, imageURL]);
        } catch (error) {
            throw error;
        }
    }

    static async deleteMovieById(id) {
        try {
            const movieExistsQuery = 'SELECT id FROM movies WHERE id = $1';
            const movieExistsResult = await infras.pool.query(movieExistsQuery, [id]);

            if (movieExistsResult.rows.length === 0) {
                throw new Error('Movie not found');
            }

            const deleteQuery = 'DELETE FROM movies WHERE id = $1';
            await infras.pool.query(deleteQuery, [id]);
        } catch (error) {
            throw error;
        }
    }

    static async updateMovieById(id, title, genres, year) {
        try {
            const movieExistsQuery = 'SELECT id FROM movies WHERE id = $1';
            const movieExistsResult = await infras.pool.query(movieExistsQuery, [id]);

            if (movieExistsResult.rows.length === 0) {
                throw new Error('Movie not found');
            }

            if (!title || !genres || !year) {
                throw new Error('title, genres and year fields are required');
            }

            const updateQuery = 'UPDATE movies SET title = $2, genres = $3, year = $4 WHERE id = $1';
            await infras.pool.query(updateQuery, [id, title, genres, year]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovieRepository;

