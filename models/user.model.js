let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique:true,
		trim:true,
		minlength:3
		},
	},
	{
		timestamps:true,
	})


const User = mongoose.model('User', userSchema)

module.exports = User