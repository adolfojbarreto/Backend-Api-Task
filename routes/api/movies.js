const express = require('express');
const router  = express.Router()

// Actor Model
const Actor = require('../../models/Actor');
const Movie = require('../../models/Movie');

//auth middleware
const auth = require('../../middleware/auth');

// @route  GET /host/api/movies
// @desc   GET ALL Movies
// @access Private
router.get('/',auth,(req,res)=>{
	Movie.find()
		.populate('actors')
		.sort({ date:-1 })
		.then(movies => {
			res.json(movies)
		})
		.catch(err => res.json({warning:err}));
});




// @route  Post /host/api/movies
// @desc   Create A Movie
// @access Private
router.post('/',auth,(req,res)=>{
	const newMovie = new Movie({
		title: req.body.title,
		year: req.body.year,
		rating: req.body.rating,
		actors: req.body.actors
	});

	newMovie.save()
		.then(movie => {
			res.json(movie)
		})
		.catch(err => res.json({warning:err}));
});



module.exports = router;
