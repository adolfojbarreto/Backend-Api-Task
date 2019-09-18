const express = require('express');
const router  = express.Router()

// Actor Model
const Actor = require('../../models/Actor');


//auth middleware
const auth = require('../../middleware/auth');

// @route  GET /host/api/actors
// @desc   GET ALL Actors
// @access Public
router.get('/',(req,res)=>{
	Actor.find()
		.sort({ date:-1 })
		.then(actors => {
			res.json(actors)
		})
		.catch(err => res.json({warning:err}));
});




// @route  Post /host/api/actors
// @desc   Create A Actor
// @access Private
router.post('/',auth,(req,res)=>{
	const newActor = new Actor({
		name: req.body.name,
		birthday: req.body.birthday,
		country: req.body.country,
	});

	newActor.save()
		.then(actor => {
		   	res.json(actor)
		})
		.catch(err => res.json({warning:err}));
});



module.exports = router;
