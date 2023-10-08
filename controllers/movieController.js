const { MovieService } = require('../services/index');

const imageBaseUrl = '/images'; // Define the base URL for your images

class MovieController {
    static async getMovies(req, res) {
        try {
            const { page, size } = req.query;
            const movies = await MovieService.getMovies(page, size);
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async insertMovie(req, res) {
        try {
            const { title, genres, year } = req.body;
            await MovieService.insertMovie(title, genres, year);
            res.status(201).json({ message: 'Movie inserted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async uploadMovieImage(req, res) {
        try {
            const { id } = req.params;
            const { filename } = req.file;

            if (!filename) {
                throw new Error('No file uploaded');
            }
            
            const imageURL = `${imageBaseUrl}/${filename}`;

            await MovieService.uploadMovieImage(id, imageURL);

            res.status(200).json({ message: 'Movie image uploaded successfully'});
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }    

    static async deleteMovieById(req, res) {
        try {
            const { id } = req.params;
            await MovieService.deleteMovieById(id);
            res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateMovieById(req, res) {
        try {
            const { id } = req.params;
            const { title, genres, year } = req.body;
            await MovieService.updateMovieById(id, title, genres, year);
            res.status(200).json({ message: 'Movie updated successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MovieController;