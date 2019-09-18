const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	rating: {
		type: String,
		required: true
	},
	actors: [
		{
	    	type: Schema.Types.ObjectId,
			ref: 'actor'
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});


module.exports = Movie = mongoose.model('movie',MovieSchema)
