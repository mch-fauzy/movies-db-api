const { MovieService } = require('../services/index');
const CONFIG = require('../configs');

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
            // Need to convert to dto and validate request params
            const { id } = req.params;

            // Check if filename is valid
            if (!req.file) {
                return res.status(400).json({ error: 'File is not exist' });
            }
            
            const { filename, isFilenameValid, isFiletypeValid} = req.file;
            // Check if filename is valid
            if (!isFilenameValid) {
                return res.status(400).json({ error: 'Filename is not valid' });
            }

            // Check if filetype is an image
            if (!isFiletypeValid) {
                return res.status(400).json({ error: 'Only image files are allowed' });
            }
            
            const imageURL = `${CONFIG.IMG.STATIC_PATH}/${filename}`;

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