const express = require('express');
const movieRouter = express.Router();
const { authenticateToken, authorizeAdmin, uploadImageToLocal, uploadImageToCloud } = require('../../middlewares');
const { MovieController } = require('../../controllers');

movieRouter.post('/movies/:id/upload-local', authenticateToken, authorizeAdmin, uploadImageToLocal, MovieController.uploadMovieImageToLocal);
movieRouter.post('/movies/:id/upload-cloud', authenticateToken, authorizeAdmin, uploadImageToCloud, MovieController.uploadMovieImageToCloud);
movieRouter.get('/movies', authenticateToken, MovieController.getMovies);
movieRouter.post('/movies', authenticateToken, authorizeAdmin, MovieController.insertMovie);
movieRouter.delete('/movies/:id', authenticateToken, authorizeAdmin, MovieController.deleteMovieById);
movieRouter.put('/movies/:id', authenticateToken, authorizeAdmin, MovieController.updateMovieById);

module.exports = movieRouter;
