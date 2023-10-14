const { MovieRepository } = require('../repository');
const CloudinaryService = require('./cloudinaryService');

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

    static async uploadMovieImageLocal(id, imageURL) {
        try {
            await MovieRepository.uploadMovieImage(id, imageURL);
        } catch (error) {
            throw error;
        }
    }

    static async uploadMovieImageCloud(id, filename, buffer) {
        try {
            const result = await CloudinaryService.uploadImageToCloudinary(filename, buffer);
            const imageURL = result.secure_url;
            await MovieRepository.uploadMovieImage(id, imageURL);
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