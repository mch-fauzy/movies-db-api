const { MovieRepository } = require('../repository/index');

class MovieService {
    static async getMovies(page, size) {
        try {
            return await MovieRepository.getMovies(page, size);
        } catch (error) {
            throw error;
        }
    }

    static async insertMovie(title, genres, year) {
        try {
            await MovieRepository.insertMovie(title, genres, year);
        } catch (error) {
            throw error;
        }
    }

    static async uploadMoviePhoto(id, filename) {
        try {
            await MovieRepository.uploadMoviePhoto(id, filename);
        } catch (error) {
            throw error;
        }
    }

    static async deleteMovieById(id) {
        try {
            await MovieRepository.deleteMovieById(id);
        } catch (error) {
            throw error;
        }
    }

    static async updateMovieById(id, title, genres, year) {
        try {
            await MovieRepository.updateMovieById(id, title, genres, year);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MovieService;