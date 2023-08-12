const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
const User = require('../models/user');
const { authenticateToken, authorizeAdmin } = require('../middlewares/auth');


// Movies Protected Endpoints
router.get('/v1/movies', authenticateToken, async (req, res) => {
    try {
        const {page, size} = req.query
        
        const movies = await Movie.getMovies(page, size);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server' });
    }
});


router.post('/v1/movies', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { title, genres, year } = req.body;
        await Movie.insertMovie(title, genres, year);
        res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
        if (error.message) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});


router.delete('/v1/movies/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await Movie.deleteMovieById(id);
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        if (error.message) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});


router.put('/v1/movies/:id', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, genres, year } = req.body;
        await Movie.updateMovieById(id, title, genres, year);
        res.json({ message: 'Movie updated successfully' });
    } catch (error) {
        if (error.message) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

// Users Protected Endpoints
router.get('/v1/users', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const {page, size} = req.query
        const users = await User.getUsers(page, size);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Register Public Endpoints
router.post('/auth/register', async (req, res) => {
    try {
        const { email, gender, password, role } = req.body;
        await User.registerUser(email, gender, password, role);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.message) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});

// Login Public Endpoints
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await User.loginUser(email, password);

        if (token) {
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        if (error.message) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});


module.exports = router;