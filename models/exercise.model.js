let mongoose = require('mongoose')
let Schema = mongoose.Schema

let excerciseSchema = new mongoose.Schema({
	username:{type:String, required:true},
	description:{type:String, required:true},
	duration:{type:Number, required:true},
	date:{type:Date, required:true},
	},
	{
		timestamps:true,
	}
)

const Exercise = mongoose.model('Exercise', excerciseSchema)

module.exports = Exercise