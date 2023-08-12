const pool = require('../infras/postgresql');
const { MovieModel } = require('../models/index');

class MovieRepository {
    static async getMovies(page = 1, size = 10) {
        try {
            page = parseInt(page);
            size = parseInt(size);
            const offset = (page - 1) * size;
            const query = 'SELECT id, title, genres, year, photo FROM movies LIMIT $1 OFFSET $2';
            const result = await pool.query(query, [size, offset]);

            const totalRows = parseInt((await pool.query('SELECT COUNT(*) FROM movies')).rows[0].count);
            const totalPages = Math.ceil(totalRows / size);

            const movies = result.rows.map(row => MovieModel.fromDatabase(row));
            return {
                data: movies,
                totalData: totalRows,
                totalPages: totalPages,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                previousPage: page > 1 ? page - 1 : null,
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
    
          const maxIdResult = await pool.query('SELECT MAX(id) FROM movies');
          const maxId = maxIdResult.rows[0].max || 0;
          const id = maxId + 1;
    
          await pool.query(query, [id, title, genres, year]);
        } catch (error) {
          throw error;
        }
      }

    static async uploadMoviePhoto(id, filename) {
        try {
            const movieExistsQuery = 'SELECT id FROM movies WHERE id = $1';
            const movieExistsResult = await pool.query(movieExistsQuery, [id]);

            if (movieExistsResult.rows.length === 0) {
                throw new Error('Movie not found');
            }

            const query = 'UPDATE movies SET photo = $2 WHERE id = $1';
            await pool.query(query, [id, filename]);

            return filename;
        } catch (error) {
            throw error;
        }
    }

    static async deleteMovieById(id) {
        try {
            const movieExistsQuery = 'SELECT id FROM movies WHERE id = $1';
            const movieExistsResult = await pool.query(movieExistsQuery, [id]);

            if (movieExistsResult.rows.length === 0) {
                throw new Error('Movie not found');
            }

            const deleteQuery = 'DELETE FROM movies WHERE id = $1';
            await pool.query(deleteQuery, [id]);
        } catch (error) {
            throw error;
        }
    }

    static async updateMovieById(id, title, genres, year) {
        try {
            const movieExistsQuery = 'SELECT id FROM movies WHERE id = $1';
            const movieExistsResult = await pool.query(movieExistsQuery, [id]);

            if (movieExistsResult.rows.length === 0) {
                throw new Error('Movie not found');
            }

            if (!title || !genres || !year) {
                throw new Error('title, genres and year fields are required');
            }

            const updateQuery = 'UPDATE movies SET title = $2, genres = $3, year = $4 WHERE id = $1';
            await pool.query(updateQuery, [id, title, genres, year]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovieRepository;

