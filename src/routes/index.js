const express = require('express');
const routerGenres = require('./genres.router');
const routerActors = require('./actors.router');
const routerDirectors = require('./directors.router');
const routerMovies = require('./movies.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres',routerGenres)
router.use('/actors', routerActors)
router.use('/directors', routerDirectors)
router.use('/movies', routerMovies)


module.exports = router;