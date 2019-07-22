let mongoose = require('mongoose')
let Schema = mongoose.Schema
let schema = new mongoose.Schema({
	name:'string',
	size:'string'
})
let Tank = mongoose.model('Tank', schema)

let small = new Tank({
	size:'large',
})

small.save(err=>{
	if(err){
		return handleError(err)
	}
})

Tank.create({
	name:'panzer',
	size: 'small',
	color:'brown' 
	}, 
	function (err, small) {
  		if (err) return handleError(err);
  		// saved!
});

Tank.find({ size: 'small' }).where('createdDate').gt(oneYearAgo).exec(callback);