const express = require('express');
const movieRouter = express.Router();
const { authenticateToken, authorizeAdmin, uploadImage } = require('../../middlewares');
const { MovieController } = require('../../controllers');

movieRouter.post('/movies/:id/upload',  authenticateToken, authorizeAdmin, uploadImage, MovieController.uploadMovieImage);
movieRouter.get('/movies', authenticateToken, MovieController.getMovies);
movieRouter.post('/movies', authenticateToken, authorizeAdmin, MovieController.insertMovie);
movieRouter.delete('/movies/:id', authenticateToken, authorizeAdmin, MovieController.deleteMovieById);
movieRouter.put('/movies/:id', authenticateToken, authorizeAdmin, MovieController.updateMovieById);

module.exports = movieRouter;
