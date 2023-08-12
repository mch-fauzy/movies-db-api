const express = require('express');
const MovieRouter = express.Router();
const { authenticateToken, authorizeAdmin, upload } = require('../middlewares/index');
const { MovieController }= require('../controllers/index');

MovieRouter.post('/movies/:id/upload',  authenticateToken, authorizeAdmin, upload.single('photo'), MovieController.uploadMoviePhoto);
MovieRouter.get('/movies', authenticateToken, MovieController.getMovies);
MovieRouter.post('/movies', authenticateToken, authorizeAdmin, MovieController.insertMovie);
MovieRouter.delete('/movies/:id', authenticateToken, authorizeAdmin, MovieController.deleteMovieById);
MovieRouter.put('/movies/:id', authenticateToken, authorizeAdmin, MovieController.updateMovieById);

module.exports = MovieRouter;
